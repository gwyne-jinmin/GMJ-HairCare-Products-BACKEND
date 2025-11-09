import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Allow both local dev and deployed frontend
const allowedOrigins = [
  "http://localhost:5173", // your local frontend (if testing locally)
  "https://gmj-hair-care-product-frontend-1-m36d07qdv.vercel.app" // deployed frontend
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong", detail: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
