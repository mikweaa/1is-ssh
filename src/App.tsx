import { Route, Routes } from "react-router-dom";
import FacultySelect from "./pages/FacultySelect";
import BranchSelect from "./pages/BranchSelect.tsx";
import DegreeTypeSelect from "./pages/DegreeTypeSelect.tsx";
import TrackSelect from "./pages/TrackSelect";
import SemesterSelect from "./pages/SemesterSelect.tsx";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import DualDiplomaSelect from "./pages/DualDiplomaSelect";
import DualDiplomaPartnerSelect from "./pages/DualDiplomaPartnerSelect";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/faculty" element={<FacultySelect />} />
      <Route path="/dual-diploma" element={<DualDiplomaSelect />} />
      <Route path="/branches/dual/:partnerId" element={<DualDiplomaPartnerSelect />} />
      <Route path="/branches" element={<BranchSelect />} />
      <Route path="/degree" element={<DegreeTypeSelect />} />
      <Route path="/track" element={<TrackSelect />} />
      <Route path="/semester" element={<SemesterSelect />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
