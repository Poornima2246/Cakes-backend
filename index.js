 


// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import { connectDB } from "./config/db.js";
// import CakeRoute from "./routes/CakeRoute.js";

// dotenv.config(); // Load environment variables from .env file

// const app = express();
// const port = process.env.PORT || 4000;

// // ======== Middleware ========
// app.use('/upload', express.static('upload')); // Serve uploaded images
// app.use(express.json()); // Parse JSON requests
// app.use(cors({ origin: '*' })); // Enable CORS for all origins

// // ======== Database Connection ========
// connectDB(); // Connect to MongoDB using the config/db.js file

// // ======== API Routes ========
// app.use("/api/dessert", CakeRoute); // Route for dessert-related APIs

// // ======== Serve Static Frontend ========
// const __dirname = path.resolve(); // Resolve the current directory
// app.use(express.static(path.join(__dirname, "../foodcort/build"))); // Serve static React files

// // ======== Fallback for SPA ========
// app.get("*", (req, res) => {
//   res.send(" hello connected")
//   res.sendFile(path.join(__dirname, "../foodcort/build", "index.html"));
//   console.log("server connected");
  
// });

// // ======== Start Server ========
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// }); 
 

//new file 

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
// import { connectDB } from "./config/db.js";
// import CakeRoute from "./routes/CakeRoute.js";

// dotenv.config(); // Load environment variables from .env file

// const app = express();
// const port = process.env.PORT || 4000;

// // ======== Middleware ========
// app.use('/upload', express.static('upload')); // Serve uploaded images
// app.use(express.json()); // Parse JSON requests
// app.use(cors({ origin: '*' })); // Enable CORS for all origins

// // ======== Database Connection ========
// connectDB(); 

// // ======== API Routes ========
// app.use("/api/dessert", CakeRoute); // Route for dessert-related APIs

// // ======== Serve Static Frontend ========
// const __dirname = path.resolve(); // Resolve the current directory
// app.use(express.static(path.join(__dirname, "../foodcort/build"))); // Serve static React files

// // ======== Fallback for SPA ========
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../foodcort/build", "index.html"));
// });

// // ======== Start Server ========
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });


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
