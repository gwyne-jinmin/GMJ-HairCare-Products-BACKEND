// server.js
const express = require("express");
const cors = require("cors"); // Import CORS
require("dotenv").config(); // Load environment variables
const productRoutes = require("./routes/product.routes");

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// ------------------------
// CORS Configuration
// ------------------------
// Replace this with your deployed frontend URL(s)
const allowedOrigins = [
  "https://gmj-hair-care-product-frontend-1.vercel.app",
  "http://localhost:5173" // optional for local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman or server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

// ------------------------
// Middleware
// ------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------------------
// Routes
// ------------------------
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Simple Products REST API." });
});

app.use("/api/products", productRoutes);

// ------------------------
// Global Error Handler
// ------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    detail: process.env.NODE_ENV !== "production" ? err.message : null,
  });
});

// ------------------------
// Start server
// ------------------------
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`Access the API at http://localhost:${PORT}`);
});
