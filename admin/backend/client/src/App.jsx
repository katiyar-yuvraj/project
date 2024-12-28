import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import StudentLogin from "./components/StudentLogin";
import StudentReg from "./components/StudentRegistration";
import Dashboard from "./components/Dashboard";
import Attendance from "./components/Attendance";
import Grades from "./components/Grades";
import Announcements from "./components/Announcements";
import TimeTable from "./components/Timetable";
import AdminNav from "./components/admin/AdminNav";
import AdminDashboard from "./components/admin/AdminDashboard";


const DashboardLayout = () => {
  return (
    <>
      {/* The Navbar is always visible for these routes */}
      <Navbar />
      {/* The Outlet is where the child routes (subpages) will be rendered */}
      <Outlet />
    </>
  );
};
const AdminDashboardLayout = () => {
  return (
    <>
      {/* The Navbar is always visible for these routes */}
      <AdminNav />
      {/* The Outlet is where the child routes (subpages) will be rendered */}
      <Outlet />
    </>
  );
};

function App() {
  return (
      <Router>
        <div className="mt-1">
          <Routes>
            {/* Route for login */}
            <Route path="/" element={<StudentLogin />} />

            {/* Route for registration */}
            <Route path="/register" element={<StudentReg />} />

            {/* Dashboard route with nested routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              {/* Default Dashboard content */}
              <Route index element={<Dashboard />} />
              {/* Sub-routes */}
              <Route path="attendance" element={<Attendance />} />
              <Route path="grades" element={<Grades />} />
              <Route path="announcements" element={<Announcements />} />
              <Route path="timetable" element={<TimeTable />} />
            </Route>

            {/* Admin route with nested routes */}
            <Route path="/admin" element={<AdminDashboardLayout />}>
              {/* Default Dashboard content */}
              <Route index element={<AdminDashboard />} />
              {/* Sub-routes */}
            </Route>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
