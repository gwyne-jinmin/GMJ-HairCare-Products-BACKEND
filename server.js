import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: "https://gmj-hair-care-product-frontend-1-m36d07qdv.vercel.app", // exact deployed frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // if you need cookies/auth
};

app.use(cors(corsOptions));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/products", productRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// Global error handler
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
