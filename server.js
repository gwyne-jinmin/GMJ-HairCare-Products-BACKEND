import express from "express"; // or const express = require("express");
import cors from "cors";       // make sure cors is imported
import productRoutes from "./routes/product.routes.js"; // adjust path
import dotenv from "dotenv";
dotenv.config();

const app = express();

// CORS config
const corsOptions = {
  origin: "https://gmj-hair-care-product-frontend.vercel.app", // your deployed frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // if you need cookies/auth
};
app.use(cors(corsOptions));

// JSON middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/products", productRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong",
    detail: process.env.NODE_ENV !== "production" ? err.message : null,
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
