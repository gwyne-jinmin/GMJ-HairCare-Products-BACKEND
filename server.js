// server.js
const express = require("express");
require("dotenv").config(); // Load environment variables
const cors = require("cors"); // ✅ Add this
const productRoutes = require("./routes/product.routes");

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Enable CORS
// Allow requests from all origins (for testing)
// Later, you can restrict it to your frontend URL for security
app.use(cors());
// OR to allow only your Vercel frontend:
// app.use(cors({ origin: "https://gmj-hair-care-product-frontend-git-main-gwyne-jinmins-projects.vercel.app" }));

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Simple root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Simple Products REST API." });
});

// Primary API route for products
app.use("/api/products", productRoutes);

// Global Error Handler Middleware
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
