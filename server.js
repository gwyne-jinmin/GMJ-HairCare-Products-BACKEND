// server.js
import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";
import dotenv from "dotenv";
import pool from "./config/db.config.js"; // your DB pool

dotenv.config();

const app = express();

// ------------------------
// CORS Configuration
// ------------------------
const allowedOrigins = [
  "https://gmj-hair-care-product-frontend-1-5f6u0sxz4.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
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
app.use("/api/products", productRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// ------------------------
// Test DB connection
// ------------------------
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    res.json({ success: true, result: rows[0].result });
  } catch (err) {
    console.error("DB connection failed:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------------------------
// Error handler
// ------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong", detail: err.message });
});

// ------------------------
// Start server
// ------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
