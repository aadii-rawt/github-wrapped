// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const app = express();

// Allow your frontend origin(s) — comma-separate if multiple
const allowedOrigins = (process.env.CORS_ORIGIN || "*")
  .split(",")
  .map(s => s.trim());

app.use(
  cors({
    origin: allowedOrigins.includes("*") ? true : allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

// --- Robust Mongo connection for serverless ---
let mongoReady = global._mongoReady; // reuse across hot invocations

async function connectMongo() {
  if (mongoReady) return mongoReady; // already in-flight or done
  mongoReady = mongoose
    .connect(process.env.MONGO_URI, {
      // dbName optional; add if you use one:
      // dbName: process.env.MONGO_DB,
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      console.log("MongoDB connected");
      return mongoose.connection;
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      throw err;
    });

  global._mongoReady = mongoReady;
  return mongoReady;
}
connectMongo().catch(() => {}); // fire and forget; route hits will await if needed

// --- Routes ---
const statsRoute = require("./routes/statsRoute");
app.use("/api/stats", async (req, res, next) => {
  try {
    await connectMongo();
    next();
  } catch (e) {
    res.status(500).json({ error: "Database connection failed" });
  }
}, statsRoute);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true, env: process.env.VERCEL ? "vercel" : "local" });
});

// Export the app for Vercel
module.exports = app;

// Only listen locally (not on Vercel)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
