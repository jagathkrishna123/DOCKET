import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Display } from "./Display/display";
import ProgramDetails from "./Display/ProgramDetails/ProgramDetails";
import FooterContents from "./Display/Footer/FooterContents";
import { NavBar } from "./Display/NavBar/navBar";
import Login from "./Display/Loign/Login";
import Layout from "./pages/teacher/Layout";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddEvent from "./pages/teacher/AddEvent";
import Registrations from "./pages/teacher/Registrations";
import Attendence from "./pages/teacher/Attendence";
import AdminLayout from "./pages/admin/Layout";
import AdminAddEvent from "./pages/admin/AddEvent";
import AdminRegistrations from "./pages/admin/Registrations";
import AdminAttendence from "./pages/admin/Attendence";
import AddProgram from "./pages/admin/AddProgram";
import TeacherAddProgram from "./pages/teacher/TeacherAddProgram";
import EventDeatils from "./Display/EventDetails/EventDeatils";
import { useAppContext } from "./context/AppContext";
import ScrollToTop from "./Display/ScrollToTop";
import EventRegistration from "./Display/EventRegistration/EventRegistration";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageProgram from "./pages/admin/ManageProgram";
import AddStudent from "./pages/teacher/AddStudent";
import AddTeacher from "./pages/admin/AddTeacher";
import AddReports from "./pages/teacher/AddReports";
import Reports from "./pages/teacher/Reports";
import UserDashboard from "./pages/UserDashboard";
import Rating from "./pages/teacher/Rating";
import UserProfile from "./pages/UserProfile";
import About from "./pages/About";
import AdminFeedback from "./pages/admin/AdminFeedback";
import AdminNotification from "./pages/admin/AdminNotification";
import TeacherNotification from "./pages/teacher/TeacherNotification";
import UserNotification from "./pages/UserNotification";
import Announcements from "./pages/Announcements";
import TeacherAnnouncement from "./pages/teacher/TeacherAnnouncement";

function App() {
  const { pathname } = useLocation()
  const { user } = useAppContext()
  const hideLayout = pathname.includes("admin") || pathname.includes("teacher") || pathname.includes("login") || !user;

  return (
    <div className="bg-gradient-to-br from-neutral-900 via-gray-900 to-black">
      <ScrollToTop />
      <ToastContainer position="bottom-right" autoClose={800} />
      <div className="w-full">
        {!hideLayout && <NavBar />}
      </div>
      <Routes>
        {/* Public/Login Route */}
        <Route 
          path="/login" 
          element={!user ? <Login /> : (
            user.role === "admin" ? <Navigate to="/admin" /> : 
            user.role === "teacher" ? <Navigate to="/teacher" /> : 
            <Navigate to="/" />
          )} 
        />

        {/* Protected Routes */}
        <Route path="/" element={user ? <Display /> : <Navigate to="/login" />} />
        <Route path="/programdetails/:id" element={user ? <ProgramDetails /> : <Navigate to="/login" />} />
        <Route path="/eventdetails/:id" element={user ? <EventDeatils /> : <Navigate to="/login" />} />
        <Route path="/event/:id/register" element={user ? <EventRegistration /> : <Navigate to="/login" />} />
        <Route path="/reports" element={user ? <Reports /> : <Navigate to="/login" />} />
        <Route path="/announcements" element={user ? <Announcements /> : <Navigate to="/login" />} />
        <Route path="/about" element={user ? <About /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={user ? <UserDashboard /> : <Navigate to="/login" />} />
        <Route path="/user-notification" element={user ? <UserNotification /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/login" />} />

        {/* Teacher Section */}
        <Route path='/teacher' element={user && user.role === 'teacher' ? <Layout /> : <Navigate to="/login" />}>
          <Route index element={<TeacherDashboard />} />
          <Route path='teacher-add-program' element={<TeacherAddProgram />} />
          <Route path='addevent' element={<AddEvent />} />
          <Route path='rating' element={<Rating />} />
          <Route path='registrations' element={<Registrations />} />
          <Route path='attendence' element={<Attendence />} />
          <Route path='teacher-announcement' element={<TeacherAnnouncement />} />
          <Route path='addstudent' element={<AddStudent />} />
          <Route path='addreports' element={<AddReports />} />
          <Route path='teacher-notification' element={<TeacherNotification />} />
        </Route>
        
        {/* Admin Section */}
        <Route path='/admin' element={user && user.role === 'admin' ? <AdminLayout /> : <Navigate to="/login" />}>
          <Route index element={<AdminDashboard />} />
          <Route path='admin-add-program' element={<AddProgram />} />
          <Route path='addevent' element={<AdminAddEvent />} />
          <Route path='addevent/:id' element={<AdminAddEvent />} />
          <Route path='manageprogram' element={<ManageProgram />} />
          <Route path='feedback' element={<AdminFeedback />} />
          <Route path='registrations' element={<AdminRegistrations />} />
          <Route path='attendence' element={<AdminAttendence />} />
          <Route path='addteacher' element={<AddTeacher />} />
          <Route path='admin-notification' element={<AdminNotification />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {!hideLayout && <FooterContents />}
    </div>
  );
}
export default App;
