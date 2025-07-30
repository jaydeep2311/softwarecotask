import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Unauthorized() {
  const { t } = useTranslation();

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Unauthorized Access</h1>
        <p className="auth-subtitle">
          You don't have permission to access this page.
        </p>
        
        <div className="form-actions">
          <Link to="/dashboard" className="btn-primary">
            Go to Dashboard
          </Link>
          <Link to="/login" className="btn-secondary">
            Login Again
          </Link>
        </div>
      </div>
    </div>
  );
}
