import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { registerUser, clearError } from '../store/slices/authSlice';
import { validateRegisterForm } from '../utils/validation';
import './Auth.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors([]);
    dispatch(clearError());

    // Validate form
    const validation = validateRegisterForm(email, username, password, acceptTerms);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    // Dispatch register action
    const result = await dispatch(registerUser({ email, username, password }));

    if (registerUser.fulfilled.match(result)) {
      // Navigation is handled by the useEffect above
    }
  };

  return (
    <div className="auth-container">
      <div className="shape-1"></div>
      <div className="shape-2"></div>
      <div className="shape-3"></div>
      <div className="shape-4"></div>
      <div className="auth-card">
        <h1 className="auth-title">{t('auth.registerTitle')}</h1>
        <p className="auth-subtitle">{t('auth.registerSubtitle')}</p>

        {(validationErrors.length > 0 || error) && (
          <div className="error-messages">
            {validationErrors.map((validationError, index) => (
              <p key={index} className="error-message">{validationError}</p>
            ))}
            {error && <p className="error-message">{error}</p>}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">{t('auth.email')}:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="form-input"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username" className="form-label">{t('auth.username')}</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="form-input"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <div className="password-header">
              <label htmlFor="password" className="form-label">{t('auth.password')}</label>
              <Link to="/forgot-password" className="forgot-password">{t('auth.forgotPassword')}?</Link>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password123"
              className="form-input"
              required
              disabled={isLoading}
            />
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="checkbox-input"
                required
              />
              {t('auth.acceptTerms')}
            </label>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? t('auth.creatingAccount') : t('auth.signUp')}
          </button>
        </form>

        <p className="auth-link">
          {t('auth.alreadyHaveAccount')} <Link to="/login">{t('auth.login')}</Link>
        </p>
      </div>
    </div>
  );
}
