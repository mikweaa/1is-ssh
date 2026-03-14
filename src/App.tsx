import { Route, Routes } from "react-router-dom";
import FacultySelect from "./pages/FacultySelect";
import BranchSelect from "./pages/BranchSelect.tsx";
import DegreeTypeSelect from "./pages/DegreeTypeSelect.tsx";
import TrackSelect from "./pages/TrackSelect";
import SemesterSelect from "./pages/SemesterSelect.tsx";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Landing from "./pages/Landing";
import DualDiplomaSelect from "./pages/DualDiplomaSelect";
import DualDiplomaPartnerSelect from "./pages/DualDiplomaPartnerSelect";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/faculty" element={<FacultySelect />} />
      <Route path="/dual-diploma" element={<DualDiplomaSelect />} />
      <Route path="/branches/dual/:partnerId" element={<DualDiplomaPartnerSelect />} />
      <Route path="/branches" element={<BranchSelect />} />
      <Route path="/degree" element={<DegreeTypeSelect />} />
      <Route path="/track" element={<TrackSelect />} />
      <Route path="/semester" element={<SemesterSelect />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
