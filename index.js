 


// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import { connectDB } from "./config/db.js";
// import CakeRoute from "./routes/CakeRoute.js";

// dotenv.config(); // Load environment variables from .env file

// const app = express();
// const port = process.env.PORT || 4000;

// // ===== Middleware =====
// app.use('/upload', express.static('upload')); // Serve uploaded images
// app.use(express.json()); // Parse JSON requests
// app.use(cors({ origin: '*' })); // Enable CORS for all origins

// // ===== Database Connection =====
// connectDB();

// // ===== API Routes =====
// app.use("/api/dessert", CakeRoute); 
// // Dessert-related API routes

// // ===== Serve React Frontend =====
// const __dirname = path.resolve(); // Resolve the current directory
// const frontendBuildPath = path.join(__dirname, "foodcort/build");

// app.use(express.static(frontendBuildPath)); // Serve static files from the React build directory

// // Catch-all route to serve the React app
// app.get("*", (req, res) => {
//     res.send("hello connected")
//     res.sendFile(path.join(frontendBuildPath, "index.html"));
// });
 

// // ===== Start Server =====
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });


const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Schema and Model
const dessertSchema = new mongoose.Schema({
  mainImage: String,
  addImage1: String,
  addImage2: String,
  name: String,
  description: String,
  category: String,
  price: Number,
});

const Dessert = mongoose.model("Dessert", dessertSchema);

// File upload configuration using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});

const upload = multer({ storage });

// Route to add a dessert
app.post("/api/dessert/add", upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "addImage1", maxCount: 1 },
  { name: "addImage2", maxCount: 1 },
]), async (req, res) => {
  try {
    const { name, description, category, price } = req.body;

    const dessert = new Dessert({
      mainImage: req.files.mainImage ? `/uploads/${req.files.mainImage[0].filename}` : null,
      addImage1: req.files.addImage1 ? `/uploads/${req.files.addImage1[0].filename}` : null,
      addImage2: req.files.addImage2 ? `/uploads/${req.files.addImage2[0].filename}` : null,
      name,
      description,
      category,
      price: Number(price),
    });

    const savedDessert = await dessert.save();
    res.status(200).json({ success: true, message: "Dessert added successfully!", data: savedDessert });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error adding dessert.", error: err.message });
  }
});

// Route to get all desserts
app.get("/api/desserts", async (req, res) => {
  try {
    const desserts = await Dessert.find();
    res.status(200).json({ success: true, data: desserts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching desserts.", error: err.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
