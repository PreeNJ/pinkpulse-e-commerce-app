const paystackBaseUrl = "https://api.paystack.co";

const getSecretKey = () => {
  if (!process.env.PAYSTACK_SECRET_KEY) {
    const error = new Error("Missing Paystack configuration: PAYSTACK_SECRET_KEY");
    error.statusCode = 500;
    throw error;
  }

  return process.env.PAYSTACK_SECRET_KEY;
};

const parseJsonResponse = async (response) => {
  const text = await response.text();
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
};

const paystackRequest = async (path, options = {}) => {
  const response = await fetch(`${paystackBaseUrl}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await parseJsonResponse(response);

  if (!response.ok || !data.status) {
    const error = new Error(data.message || `Paystack request failed with HTTP ${response.status}.`);
    error.statusCode = response.ok ? 502 : response.status;
    throw error;
  }

  return data.data;
};

const initializeTransaction = async (req, res) => {
  try {
    const email = String(req.body.email || "").trim();
    const amount = Number(req.body.amount);
    const callbackUrl = process.env.PAYSTACK_CALLBACK_URL || undefined;

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: "Enter a valid email address for Paystack checkout." });
    }
    if (!Number.isInteger(amount) || amount < 1) {
      return res.status(400).json({ error: "Payment amount must be a whole number greater than zero." });
    }

    const transaction = await paystackRequest("/transaction/initialize", {
      method: "POST",
      body: JSON.stringify({
        email,
        amount: String(amount * 100),
        currency: "KES",
        ...(callbackUrl ? { callback_url: callbackUrl } : {}),
        metadata: {
          customer_name: String(req.body.fullName || "Client").slice(0, 100),
          location: String(req.body.location || "").slice(0, 100),
        },
      }),
    });

    return res.json({
      success: true,
      authorization_url: transaction.authorization_url,
      access_code: transaction.access_code,
      reference: transaction.reference,
    });
  } catch (error) {
    console.error("Paystack initialization error:", error.message);
    return res.status(error.statusCode || 502).json({ error: error.message || "Paystack request failed." });
  }
};

const verifyTransaction = async (req, res) => {
  try {
    const reference = String(req.params.reference || "").trim();
    if (!reference) return res.status(400).json({ error: "Paystack transaction reference is required." });

    const transaction = await paystackRequest(`/transaction/verify/${encodeURIComponent(reference)}`);
    return res.json({
      success: true,
      status: transaction.status,
      reference: transaction.reference,
      amount: transaction.amount,
      currency: transaction.currency,
      receipt: transaction.reference,
    });
  } catch (error) {
    console.error("Paystack verification error:", error.message);
    return res.status(error.statusCode || 502).json({ error: error.message || "Paystack verification failed." });
  }
};

module.exports = { initializeTransaction, verifyTransaction };