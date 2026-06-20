import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Admissions from "./components/Admissions";
import Events from "./components/Events";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const location = useLocation();

  // Hide Navbar on login and dashboard
  const hideNavbar = location.pathname === "/login" || location.pathname === "/dashboard";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* ✅ Home route with all sections */}
        <Route
          path="/"
          element={
            <>
              <section id="hero"><Hero /></section>
              <section id="about"><About /></section>
              <section id="admissions"><Admissions /></section>
              <section id="gallery"><Gallery /></section>
              <section id="contact"><Contact /></section>
              <Footer />
            </>
          }
        />

        {/* ✅ Login route */}
        <Route path="/login" element={<Login />} />

        {/* ✅ Dashboard route (protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
