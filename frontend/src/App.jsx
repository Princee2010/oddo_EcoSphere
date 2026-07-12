import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CarbonPage from "./pages/CarbonPage";
import EnergyPage from "./pages/EnergyPage";
import WaterPage from "./pages/WaterPage";
import WastePage from "./pages/WastePage";
import SuppliersPage from "./pages/SuppliersPage";
import GoalsPage from "./pages/GoalsPage";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/carbon" element={<CarbonPage />} />
        <Route path="/energy" element={<EnergyPage />} />
        <Route path="/water" element={<WaterPage />} />
        <Route path="/waste" element={<WastePage />} />
        <Route path="/suppliers" element={<SuppliersPage />} />
        <Route path="/goals" element={<GoalsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
