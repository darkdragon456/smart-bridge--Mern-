import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import { connectCloudinary } from "./config/cloudinary.js";

// Route imports
import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import addressRoutes from "./routes/address.routes.js";
import orderRoutes from "./routes/order.routes.js";

dotenv.config();
console.log("DEBUG PORT:", process.env.PORT);
const app = express();

// Connect Cloudinary
await connectCloudinary();

// Middlewares


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

// Static image folder
app.use("/images", express.static("uploads"));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Api is running ");
});

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`DEBUG PORT: ${PORT}`);
  console.log(`🚀 Server is running at: http://localhost:${PORT}`);
  console.log("DEBUG MONGO_URI:", process.env.MONGO_URI); 
  // Connect to MongoDB
  await connectDB();
});