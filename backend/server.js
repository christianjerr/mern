import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/products.route.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());

const { PORT } = process.env || 8000;

const __dirname = path.resolve();

app.use(express.json());

app.use("/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT || 8000, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}/`);
});
