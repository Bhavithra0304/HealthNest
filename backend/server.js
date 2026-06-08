require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const authRoutes        = require("./routes/authRoutes");
const doctorRoutes      = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const patientRoutes     = require("./routes/patientRoutes");
const contactRoutes     = require("./routes/contactRoutes");
const dashboardRoutes   = require("./routes/dashboardRoutes");
const billRoutes        = require("./routes/billRoutes");

const app = express();

connectDB();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/api/auth",         authRoutes);
app.use("/api/doctors",      doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/patients",     patientRoutes);
app.use("/api/contact",      contactRoutes);
app.use("/api/dashboard",    dashboardRoutes);
app.use("/api/bills",        billRoutes);

app.get("/api/health", (req, res) => res.json({ status: "HealthNest API running" }));

app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`HealthNest server running on port ${PORT}`));
