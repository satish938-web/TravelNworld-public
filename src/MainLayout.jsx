// src/layouts/MainLayout.jsx
import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import WhatsAppIcon from "./components/WhatsAppIcon";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <NavBar />
      <main className="pt-20">
        <Outlet /> {/* This will render child routes */}
      </main>
      <Footer />
      <WhatsAppIcon />
    </div>
  );
}
