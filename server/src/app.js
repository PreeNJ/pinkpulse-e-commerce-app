const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const productImageRoutes = require("./routes/productImage.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/product-images", productImageRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the PinkPulse API Server!",
  });
});

module.exports = app;