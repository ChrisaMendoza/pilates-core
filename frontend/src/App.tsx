import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import MainLayout from './layouts/MainLayout';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PricingPage from './pages/PricingPage';
import PaymentPage from './pages/PaymentPage';
import ProfilePage from './pages/ProfilePage';
import PlanningPage from './pages/PlanningPage';

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
                    <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
                    <Route path="/register" element={<MainLayout><RegisterPage /></MainLayout>} />
                    <Route path="/pricing" element={<MainLayout><PricingPage /></MainLayout>} />
                    <Route path="/payment" element={<MainLayout><PaymentPage /></MainLayout>} />
                    <Route path="/profile" element={<MainLayout><ProfilePage /></MainLayout>} />
                    <Route path="/planning" element={<MainLayout><PlanningPage /></MainLayout>} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
