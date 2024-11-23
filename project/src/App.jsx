import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import StudentLogin from "./components/StudentLogin";
import StudentReg from "./components/StudentRegitration";
import { StudentState } from "./context/StudentContext";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <StudentState>
      <Router>
        <div className="mt-1">
          <Routes>
            {/* Route for login */}
            <Route path="/" element={<StudentLogin />} />
            
            {/* Route for registration */}
            <Route path="/register" element={<StudentReg />} />
            
            {/* Dashboard route with nested routes */}
            <Route path="/dashboard" element={<Navbar />}>
              {/* Sub-route for the Dashboard content */}
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </StudentState>
  );
}


export default App;
