import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { store } from './store';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { initializeAuth } from './store/slices/authSlice';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Unauthorized from './components/Unauthorized';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import Projects from './components/Projects';
import AddProject from './components/AddProject';
import EditProject from './components/EditProject';
import Estimates from './components/Estimates';
import AddEstimate from './components/AddEstimate';
import EditEstimate from './components/EditEstimate';
import './i18n';
import './App.css';

function Home() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <div className="home-container">
      <h1>Welcome to the Admin Panel</h1>
      <div className="home-links">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="nav-link">{t('auth.login')}</Link>
            <Link to="/register" className="nav-link">{t('auth.register')}</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="nav-link">{t('navigation.dashboard')}</Link>
            <Link to="/projects" className="nav-link">{t('navigation.projects')}</Link>
            <Link to="/estimates" className="nav-link">{t('navigation.estimates')}</Link>
          </>
        )}
      </div>
    </div>
  );
}

function AppContent() {
  const dispatch = useAppDispatch();
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="loading-spinner">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Redirect root to appropriate page */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/home" element={<Home />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/add"
          element={
            <ProtectedRoute>
              <AddProject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/edit/:id"
          element={
            <ProtectedRoute>
              <EditProject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/estimates"
          element={
            <ProtectedRoute>
              <Estimates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/estimates/add"
          element={
            <ProtectedRoute>
              <AddEstimate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/estimates/edit/:id"
          element={
            <ProtectedRoute>
              <EditEstimate />
            </ProtectedRoute>
          }
        />

        {/* Error Routes */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
