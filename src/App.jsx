import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import PageLoader from './components/common/PageLoader';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load public pages
const Homepage = lazy(() => import('./pages/Homepage'));
const BrowseProjects = lazy(() => import('./pages/BrowseProjects'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const SellProject = lazy(() => import('./pages/SellProject'));
const CustomRequest = lazy(() => import('./pages/CustomRequest'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const LoginMock = lazy(() => import('./pages/LoginMock'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Lazy load admin pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminCustomRequests = lazy(() => import('./pages/admin/AdminCustomRequests'));
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics'));

// Admin components (not lazy — small, needed immediately)
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminProtectedRoute = lazy(() => import('./components/admin/AdminProtectedRoute'));

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>

              {/* ── Public Routes ── */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Homepage />} />
                <Route path="browse" element={<BrowseProjects />} />
                <Route path="project/:id" element={<ProjectDetails />} />
                <Route path="projects/:id" element={<Navigate to="/project/:id" replace />} />
                <Route path="sell" element={<SellProject />} />
                <Route path="custom-request" element={<CustomRequest />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="how-it-works" element={<HowItWorks />} />
                <Route path="faq" element={<FAQPage />} />
                <Route path="contact" element={<ContactUs />} />
                <Route path="login-mock" element={<LoginMock />} />
                <Route path="404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Route>

              {/* ── Admin Routes (outside MainLayout, no public navbar/footer) ── */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <AdminProtectedRoute>
                    <AdminLayout />
                  </AdminProtectedRoute>
                }
              >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="custom-requests" element={<AdminCustomRequests />} />
                <Route path="analytics" element={<AdminAnalytics />} />
              </Route>

            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}