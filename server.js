// server.js
const express = require("express");
require("dotenv").config(); // Load environment variables
const productRoutes = require("./routes/product.routes");

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
// This is essential for handling JSON requests for POST/PUT operations
app.use(express.json());

// Middleware to parse URL-encoded bodies (If you needed form data)
app.use(express.urlencoded({ extended: true }));

// Simple root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Simple Products REST API." });
});

// Primary API route for products
app.use("/api/products", productRoutes);

// Global Error Handler Middleware (Good practice for catching unhandled errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    detail: process.env.NODE_ENV !== "production" ? err.message : null,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`Access the API at http://localhost:${PORT}`);
});