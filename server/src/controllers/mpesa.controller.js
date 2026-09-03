const darajaBaseUrl = process.env.MPESA_BASE_URL || "https://sandbox.safaricom.co.ke";

const getRequiredConfig = () => {
    const required = [
        "MPESA_CONSUMER_KEY",
        "MPESA_CONSUMER_SECRET",
        "MPESA_SHORTCODE",
        "MPESA_PASSKEY",
        "MPESA_CALLBACK_URL",
    ];
    const missing = required.filter((key) => !process.env[key]);

    if (missing.length > 0) {
        const error = new Error(`Missing M-Pesa configuration: ${missing.join(", ")}`);
        error.statusCode = 500;
        throw error;
    }
};

const normalizePhoneNumber = (value) => {
    const digits = String(value || "").replace(/\D/g, "");
    if (digits.startsWith("254") && digits.length === 12) return digits;
    if ((digits.startsWith("07") || digits.startsWith("01")) && digits.length === 10) {
        return `254${digits.slice(1)}`;
    }
    return null;
};

const getAccessToken = async () => {
    const credentials = Buffer.from(
        `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString("base64");
    const response = await fetch(`${darajaBaseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
        headers: { Authorization: `Basic ${credentials}` },
    });

    const data = await response.json();
    if (!response.ok || !data.access_token) {
        throw new Error(data.errorMessage || "Unable to authenticate with M-Pesa.");
    }
    return data.access_token;
};

const getTimestamp = () => {
    const now = new Date();
    const parts = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
        String(now.getHours()).padStart(2, "0"),
        String(now.getMinutes()).padStart(2, "0"),
        String(now.getSeconds()).padStart(2, "0"),
    ];
    return parts.join("");
};

const stkPush = async (req, res) => {
    try {
        getRequiredConfig();

        const phoneNumber = normalizePhoneNumber(req.body.phoneNumber);
        const amount = Number(req.body.amount);
        if (!phoneNumber) {
            return res.status(400).json({ error: "Enter a valid Kenyan M-Pesa phone number." });
        }
        if (!Number.isInteger(amount) || amount < 1) {
            return res.status(400).json({ error: "Payment amount must be a whole number greater than zero." });
        }

        const timestamp = getTimestamp();
        const password = Buffer.from(
            `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
        ).toString("base64");
        const accessToken = await getAccessToken();
        const response = await fetch(`${darajaBaseUrl}/mpesa/stkpush/v1/processrequest`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                BusinessShortCode: process.env.MPESA_SHORTCODE,
                Password: password,
                Timestamp: timestamp,
                TransactionType: "CustomerBuyGoodsOnline",
                Amount: amount,
                PartyA: phoneNumber,
                PartyB: process.env.MPESA_SHORTCODE,
                PhoneNumber: phoneNumber,
                CallBackURL: process.env.MPESA_CALLBACK_URL,
                AccountReference: String(req.body.accountReference || "PinkPulse").slice(0, 12),
                TransactionDesc: String(req.body.orderNotes || "Pink Pulse order").slice(0, 20),
            }),
        });

        const data = await response.json();
        if (!response.ok || data.ResponseCode !== "0") {
            return res.status(502).json({
                error: data.errorMessage || data.ResponseDescription || "M-Pesa STK Push could not be sent.",
            });
        }

        return res.status(200).json({
            success: true,
            CheckoutRequestID: data.CheckoutRequestID,
            CustomerMessage: data.CustomerMessage,
        });
    } catch (error) {
        console.error("M-Pesa STK Push error:", error.message);
        return res.status(error.statusCode || 502).json({ error: error.message || "M-Pesa request failed." });
    }
};

const queryStkPush = async (req, res) => {
    try {
        getRequiredConfig();
        const checkoutRequestId = String(req.params.checkoutRequestId || "");
        if (!checkoutRequestId) return res.status(400).json({ error: "Checkout request ID is required." });

        const timestamp = getTimestamp();
        const password = Buffer.from(
            `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
        ).toString("base64");
        const accessToken = await getAccessToken();
        const response = await fetch(`${darajaBaseUrl}/mpesa/stkpushquery/v1/query`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                BusinessShortCode: process.env.MPESA_SHORTCODE,
                Password: password,
                Timestamp: timestamp,
                CheckoutRequestID: checkoutRequestId,
            }),
        });

        const data = await response.json();
        if (data.ResultCode === "0") {
            return res.json({ status: "COMPLETED", receipt: data.CallbackMetadata?.Item?.find((item) => item.Name === "MpesaReceiptNumber")?.Value });
        }
        if (data.ResultCode && data.ResultCode !== "0") {
            return res.json({ status: "FAILED", description: data.ResultDesc || "Payment was not completed." });
        }
        return res.json({ status: "PENDING" });
    } catch (error) {
        console.error("M-Pesa query error:", error.message);
        return res.status(error.statusCode || 502).json({ error: error.message || "M-Pesa query failed." });
    }
};

const stkCallback = (req, res) => {
    console.log("M-Pesa callback received:", JSON.stringify(req.body));
    return res.json({ ResultCode: 0, ResultDesc: "Accepted" });
};

module.exports = { stkPush, queryStkPush, stkCallback };
