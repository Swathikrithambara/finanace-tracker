import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SignIn from "./auth/SignIn";
import ProtectedRoute from "./auth/ProtectedRoute";

import DashboardLayout from "./Layout/DashboardLayout";
import Dashboard from "./Pages/Dashboard";
import Income from "./Pages/Income";
import Expenses from "./Pages/Expenses";
import AddIncome from "./Pages/AddIncome";
import AddExpense from "./Pages/AddExpense";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ENTRY */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* PUBLIC */}
        <Route path="/signin" element={<SignIn />} />

        {/* PROTECTED */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/income"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Income />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Expenses />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/add-income" element={
  <ProtectedRoute>
    <AddIncome />
  </ProtectedRoute>
} />

<Route path="/add-expense" element={
  <ProtectedRoute>
    <AddExpense />
  </ProtectedRoute>
} />


      </Routes>
    </BrowserRouter>
  );
}
