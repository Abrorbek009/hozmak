const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const mainRoutes = require("./routes/mainRoutes");
const { connectDB } = require("./config/dbConfig"); // to'g'ri yo'l
require("dotenv").config();

const app = express();

// MongoDB ulanish (server ishga tushganda)
connectDB();

// CORS — Hammaga ruxsat (production uchun ehtiyot bo'ling, keyin cheklang)
app.use(cors({
  origin: "*", // yoki ["https://sizning-frontend.vercel.app"]
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true // agar cookie/session ishlatilsa
}));

app.options("*", cors()); // preflight so'rovlar uchun

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use(
  session({
    secret: process.env.JWT_SECRET || "fallback_secret_123", // majburiy bo'lsin
    resave: false,
    saveUninitialized: false, // true emas, xavfsizlik uchun
    cookie: { secure: false } // HTTPS bo'lsa true qiling
  })
);

// API route'lar
app.use("/api", mainRoutes);

// Asosiy route (test uchun)
app.get("/", (req, res) => {
  res.json({ message: "Backend ishlayapti! 🚀" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});