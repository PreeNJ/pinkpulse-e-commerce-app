const express = require("express");
const cors = require("cors");

const categoryRoutes = require("./routes/category.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/categories", categoryRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the PinkPulse API Server!",
  });
});

module.exports = app;