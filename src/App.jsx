import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import InboxPilot from "./pages/InboxPilot";
import About from "./pages/About";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { DashboardOverview } from "./pages/dashboard/Overview";
import { InboxPilotDashboard } from "./pages/dashboard/InboxPilotDashboard";
import { CodeGate } from "./pages/dashboard/CodeGate";
import { AuthProvider, useAuth } from "./context/AuthContext";
import SmoothScroll from "./components/SmoothScroll";
import LogoSpinner from "./components/LogoSpinner";

const getInitialTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
};

// Route protection component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LogoSpinner text="Loading..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/dashboard/login" replace />;
  }

  return children;
};

const App = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <AuthProvider>
      <SmoothScroll>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />
            <Route
              path="/inboxpilot"
              element={<InboxPilot theme={theme} setTheme={setTheme} />}
            />
            <Route
              path="/about"
              element={<About theme={theme} setTheme={setTheme} />}
            />
            
            {/* Dashboard Login */}
            <Route path="/dashboard/login" element={<CodeGate />} />
            
            {/* Protected Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout theme={theme} setTheme={setTheme} />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardOverview />} />
              <Route path="inboxpilot" element={<InboxPilotDashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SmoothScroll>
    </AuthProvider>
  );
};

export default App;