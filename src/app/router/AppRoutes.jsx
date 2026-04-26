import { Routes, Route, Navigate } from "react-router-dom"
import { AuthPage } from "../../features/auth/pages/AuthPage";
import { DashboardPage } from "../layouts/DashboardPage";
import { useAuthStore } from "../../features/auth/store/authStore";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/" replace />;
};

export const AppRoutes = () => {
    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<AuthPage />} />

            {/* Protegido por rol */}
            <Route path="/dashboard/*" element={
                <ProtectedRoute>
                    <DashboardPage />
                </ProtectedRoute>
            } />

        </Routes>
    );
}