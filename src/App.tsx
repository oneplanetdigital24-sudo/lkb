import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Gallery from './pages/Gallery';
import Resources from './pages/Resources';
import AppointmentBooking from './pages/services/AppointmentBooking';
import PublicGrievance from './pages/services/PublicGrievance';
import HealthSupport from './pages/services/HealthSupport';
import EducationSupport from './pages/services/EducationSupport';
import Invitation from './pages/services/Invitation';
import RealEstateConsultancy from './pages/services/RealEstateConsultancy';
import LanguageManager from './pages/admin/LanguageManager';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/services/appointment" element={<AppointmentBooking />} />
                <Route path="/services/grievance" element={<PublicGrievance />} />
                <Route path="/services/health" element={<HealthSupport />} />
                <Route path="/services/education" element={<EducationSupport />} />
                <Route path="/services/invitation" element={<Invitation />} />
                <Route path="/services/real-estate" element={<RealEstateConsultancy />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/admin/languages" element={<LanguageManager />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;