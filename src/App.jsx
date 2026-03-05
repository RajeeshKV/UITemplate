import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ParticleBackground from "./components/ParticleBackground";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <Router>
      <div
        className="relative min-h-screen overflow-x-hidden transition-colors duration-300"
        style={{ background: "var(--clr-bg)", color: "var(--clr-text)" }}
      >
        {/* Subtle particle animation */}
        <ParticleBackground />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

        <ScrollToTop />
      </div>
    </Router>
  );
}
