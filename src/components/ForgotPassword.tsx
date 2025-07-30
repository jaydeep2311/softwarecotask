import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { forgotPassword, clearError } from '../store/slices/authSlice';
import { validateEmail } from '../utils/validation';
import './Auth.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Clear errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors([]);
    setMessage('');
    dispatch(clearError());

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setValidationErrors(emailValidation.errors);
      return;
    }

    // Dispatch forgot password action
    const result = await dispatch(forgotPassword(email));

    if (forgotPassword.fulfilled.match(result)) {
      setMessage(t('auth.checkEmail'));
      setEmail('');
    }
  };

  return (
    <div className="auth-container">
      <div className="shape-1"></div>
      <div className="shape-2"></div>
      <div className="shape-3"></div>
      <div className="shape-4"></div>
      <div className="auth-card">
        <h1 className="auth-title">{t('auth.forgotPasswordTitle')}</h1>
        <p className="auth-subtitle">{t('auth.forgotPasswordSubtitle')}</p>

        {(validationErrors.length > 0 || error) && (
          <div className="error-messages">
            {validationErrors.map((validationError, index) => (
              <p key={index} className="error-message">{validationError}</p>
            ))}
            {error && <p className="error-message">{error}</p>}
          </div>
        )}

        {message && (
          <div className="success-message">
            <p>{message}</p>
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
              placeholder={t('auth.email')}
              className="form-input"
              required
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className="auth-button" 
            disabled={isLoading}
          >
            {isLoading ? t('auth.sendingInstructions') : t('auth.resetInstructions')}
          </button>
        </form>

        <p className="auth-link">
          {t('auth.alreadyHaveAccount')} <Link to="/login">{t('auth.login')}</Link>
        </p>
      </div>
    </div>
  );
}
