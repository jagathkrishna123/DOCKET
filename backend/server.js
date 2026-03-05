import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import upload from "./Middleware/multer.js";

import { addAllowedAdmin } from "./Contrlos/Admin/createAdmin.js"
import { verifyId } from "./Contrlos/VeriftId/verifyId.js"
import { sendOtp } from "./Contrlos/VeriftId/sendOtp.js"
import { verifyOtp } from "./Contrlos/VeriftId/verifiedOtp.js"
import { registerUser } from "./Contrlos/Signup/Signup.js"
import { loginUser } from "./Contrlos/Login/login.js"
import { lookupUserByRegisterNumber } from "./Contrlos/Loockup/loockUp.js"
import { getAllUsers } from "./Contrlos/GetAllUsers/getAllUsers.js"
import { getAllTeachers } from "./Contrlos/Teachers/getAllTeachers.js"
import { addTeacher } from "./Contrlos/Teachers/addTeacher.js"
import { updateTeacher } from "./Contrlos/Teachers/updateTeacher.js"
import { deleteTeacher } from "./Contrlos/Teachers/deleteTeacher.js"
import { getAllStudents } from "./Contrlos/Students/getAllStudents.js"
import { createStudent } from "./Contrlos/Students/addStudents.js"
import { updateStudent } from "./Contrlos/Students/updateStudents.js"
import { deleteStudent } from "./Contrlos/Students/deleteStudents.js"
import { getAllPrograms } from "./Contrlos/Programs/getAllPrograms.js"
import { createProgram } from "./Contrlos/Programs/createPrograms.js"
import { updateProgram } from "./Contrlos/Programs/updatePrograms.js"
import { deleteProgram } from "./Contrlos/Programs/deletePrograms.js"
import { getAllEvents } from "./Contrlos/Events/getAllEvents.js"
import { createEvent } from "./Contrlos/Events/addEvents.js"
import { updateEvent } from "./Contrlos/Events/updateEvents.js"
import { updateEventStatus } from "./Contrlos/Events/updateEventsStatus.js"
import { getRegisteredTeachers } from "./Contrlos/Teachers/getRegsterdTeachers.js"
import { deleteEvent } from "./Contrlos/Events/deleteEvents.js"
import { getAllRegistrations } from "./Contrlos/Registration/getAllRegistraion.js"
import { createRegistration } from "./Contrlos/Registration/createRegistration.js"
import { getRegistrationsByUser } from "./Contrlos/Registration/getRegistraionByuserId.js"
import { getAllAttendance } from "./Contrlos/Attendance/getAllAttendance.js"
import { markAttendance } from "./Contrlos/Attendance/markAttendance.js"
import { updateAttendanceStatus } from "./Contrlos/Attendance/updateAttendance.js"
import { getAllRatings } from "./Contrlos/Rating/getAllRating.js"
import { upsertRating } from "./Contrlos/Rating/updateRating.js"
import { getAllReports } from "./Contrlos/Reports/getAllReports.js"
import { createReport } from "./Contrlos/Reports/createReport.js"
import { deleteReport } from "./Contrlos/Reports/deleteReports.js"
import { getAllNotifications } from "./Contrlos/Notification/getAllNotifications.js"
import { createNotification } from "./Contrlos/Notification/createNotification.js"
import { addReplyToNotification } from "./Contrlos/Notification/createReplyNotification.js"
import { getAllEventResults } from "./Contrlos/EventsResults/getAllEventsResults.js"
import { createEventResults } from "./Contrlos/EventsResults/addEventsResults.js"
import { deleteEventResult } from "./Contrlos/EventsResults/deleteEventsResults.js"
import { updateUser, updateProfileImage } from "./Contrlos/UpdateUser/updateuser.js";

dotenv.config(); // Load environment variables

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.error("❌ MongoDB Connection Failed:", error.message);
    });

// In-memory OTP storage
const otpStore = new Map(); // Key: registerNumber, Value: otp

// Consolidate CORS configuration and fix trailing slash
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
// Create or connect to database

app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));


app.post("/add-allowed-admin", addAllowedAdmin);
app.post("/verify-id", verifyId);
app.post("/send-otp", sendOtp);
app.post("/verify-otp", verifyOtp);
app.post("/register", registerUser);
app.post("/login", loginUser);
app.get("/api/users/lookup/:regNo", lookupUserByRegisterNumber);
app.get("/api/users", getAllUsers);
app.put("/api/users/:id", updateUser);
app.put("/api/profile-picture/:id", upload.array("file", 5), updateProfileImage);
app.get("/api/teachers", getAllTeachers);
app.post("/api/teachers", addTeacher);
app.put("/api/teachers/:id", updateTeacher);
app.delete("/api/teachers/:id", deleteTeacher);
app.get("/api/students", getAllStudents);
app.post("/api/students", createStudent);
app.put("/api/students/:id", updateStudent);
app.delete("/api/students/:id", deleteStudent);
app.get("/api/programs", getAllPrograms);
app.post("/api/programs", upload.array("file", 5), createProgram);
app.put("/api/programs/:id", upload.array("file", 5), updateProgram);
app.delete("/api/programs/:id", deleteProgram);
app.get("/api/events", getAllEvents);
app.post("/api/events", upload.array("file", 5), createEvent);
app.put("/api/events/:id", upload.array("file", 5), updateEvent);
app.patch("/api/events/:id/status", updateEventStatus);
app.get("/api/registered-teachers", getRegisteredTeachers);
app.delete("/api/events/:id", deleteEvent);
app.get("/api/registrations", getAllRegistrations);
app.post("/api/registrations", createRegistration);
app.get("/api/registrations/user/:userId", getRegistrationsByUser);
app.get("/api/attendance", getAllAttendance);
app.post("/api/attendance", markAttendance);
app.patch("/api/attendance/:id", updateAttendanceStatus);
app.get("/api/ratings", getAllRatings);
app.post("/api/ratings", upsertRating);
app.get("/api/reports", getAllReports);
app.post("/api/reports", upload.array("file", 5), createReport);
app.delete("/api/reports/:id", deleteReport);
app.get("/api/notifications", getAllNotifications);
app.post("/api/notifications", upload.array("file", 5), createNotification);
app.post("/api/notifications/:id/reply", addReplyToNotification);
app.get("/api/event-results", getAllEventResults);
app.post("/api/event-results", createEventResults);
app.delete("/api/event-results/:id", deleteEventResult);





app.listen(5000, () => {
    console.log("Server running on port 5000");
});
