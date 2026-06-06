/**
 * Run once to seed initial doctors into MongoDB:
 *   node backend/scripts/seedDoctors.js
 */
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const mongoose = require("mongoose");
const Doctor = require("../models/Doctor");

const doctors = [
  { name: "Dr. Sarah Johnson",  email: "sarah@healthnest.com",   specialization: "Cardiologist",      department: "Cardiology",    experience: "15 yrs", qualification: "MD, FACC",  status: "Active" },
  { name: "Dr. Michael Chen",   email: "michael@healthnest.com", specialization: "Neurologist",        department: "Neurology",     experience: "12 yrs", qualification: "MD, PhD",   status: "Active" },
  { name: "Dr. Emily Davis",    email: "emily@healthnest.com",   specialization: "Orthopedic Surgeon", department: "Orthopedics",   experience: "10 yrs", qualification: "MS, MCh",   status: "Active" },
  { name: "Dr. Robert Wilson",  email: "robert@healthnest.com",  specialization: "Pediatrician",       department: "Pediatrics",    experience: "18 yrs", qualification: "MD, FAAP",  status: "Active" },
  { name: "Dr. Lisa Park",      email: "lisa@healthnest.com",    specialization: "Dermatologist",      department: "Dermatology",   experience: "8 yrs",  qualification: "MD, FAAD",  status: "Active" },
  { name: "Dr. James Martinez", email: "james@healthnest.com",   specialization: "Oncologist",         department: "Oncology",      experience: "20 yrs", qualification: "MD, FASCO", status: "Active" },
  { name: "Dr. Anna Thompson",  email: "anna@healthnest.com",    specialization: "Ophthalmologist",    department: "Ophthalmology", experience: "11 yrs", qualification: "MD, FACS",  status: "Active" },
  { name: "Dr. David Kumar",    email: "david@healthnest.com",   specialization: "Pulmonologist",      department: "Pulmonology",   experience: "14 yrs", qualification: "MD, FCCP",  status: "Active" },
];

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Doctor.deleteMany({});
  await Doctor.insertMany(doctors);
  console.log("✅ Doctors seeded successfully");
  process.exit(0);
})();
