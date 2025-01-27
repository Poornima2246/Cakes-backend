 


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import CakeRoute from "./routes/CakeRoute.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 4000;

// ===== Middleware =====
app.use('/upload', express.static('upload')); // Serve uploaded images
app.use(express.json()); // Parse JSON requests
app.use(cors({ origin: '*' })); // Enable CORS for all origins

// ===== Database Connection =====
connectDB();

// ===== API Routes =====
app.use("/api/dessert", CakeRoute); 
// Dessert-related API routes

// ===== Serve React Frontend =====
const __dirname = path.resolve(); // Resolve the current directory
const frontendBuildPath = path.join(__dirname, "foodcort/build");

app.use(express.static(frontendBuildPath)); // Serve static files from the React build directory

// Catch-all route to serve the React app
app.get("*", (req, res) => {
    res.send("hello connected")
    res.sendFile(path.join(frontendBuildPath, "index.html"));
});
 

// ===== Start Server =====
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
 