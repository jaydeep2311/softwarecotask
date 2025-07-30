import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { setLanguage } from '../store/slices/uiSlice';
import { dashboardAPI } from '../services/mockApi';
import type { DashboardStats } from '../services/mockApi';
import { formatCurrency } from '../utils/helpers';
import PlaceholderImage from './PlaceholderImage';
import './Dashboard.css';

const salesData = [
  { month: 'Jan', value: 65 },
  { month: 'Feb', value: 59 },
  { month: 'Mar', value: 80 },
  { month: 'Apr', value: 81 },
  { month: 'May', value: 56 },
  { month: 'Jun', value: 85 },
  { month: 'Jul', value: 90 },
  { month: 'Aug', value: 40 },
  { month: 'Sep', value: 95 },
  { month: 'Oct', value: 85 },
  { month: 'Nov', value: 75 },
  { month: 'Dec', value: 85 }
];

const tableData = [
  {
    id: 1,
    productName: 'Apple Watch',
    location: '6096 Marjolaine Landing',
    dateTime: '12 09 2019 - 12:53 PM',
    piece: 423,
    amount: '$34,295',
    status: 'Delivered'
  }
];

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { currentLanguage } = useAppSelector((state) => state.ui);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboardAPI.getStats();
        setStats(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleLanguageChange = (lang: string) => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
  };

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="dashboard-error">
        <div className="error-message">
          <p>Error: {error || 'Failed to load dashboard data'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <span className="logo-text">LOGO</span>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item active">
            <span className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="9"></rect>
                <rect x="14" y="3" width="7" height="5"></rect>
                <rect x="14" y="12" width="7" height="9"></rect>
                <rect x="3" y="16" width="7" height="5"></rect>
              </svg>
            </span>
            Dashboard
          </Link>
          
          <Link to="/projects" className="nav-item">
            <span className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </span>
            Projects
          </Link>
          
          <Link to="/estimates" className="nav-item">
            <span className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10,9 9,9 8,9"></polyline>
              </svg>
            </span>
            Estimates
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16,17 21,12 16,7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <div className="search-container">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input type="text" placeholder="Search" className="search-input" />
            </div>
          </div>
          
          <div className="header-right">
            <div className="header-actions">
              {/* Notifications */}
              <button className="header-btn notification-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                </svg>
                <span className="notification-badge"></span>
              </button>

              {/* Language Selector */}
              <div className="language-selector">
                <span className="flag-emoji">🇬🇧</span>
                <select
                  value={currentLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="language-select"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>

              {/* Profile */}
              <div className="profile-section">
                <PlaceholderImage width={32} height={32} className="profile-avatar" alt="Profile" />
                <span className="profile-name">{user?.username || 'User'}</span>
              </div>

              {/* Dark Mode Toggle */}
              <button className="header-btn theme-toggle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <h1 className="dashboard-title">Dashboard</h1>

          {/* Metrics Cards */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-header">
                  <h3 className="metric-title">Total User</h3>
                  <div className="metric-icon user-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </div>
                <div className="metric-value">40,689</div>
                <div className="metric-trend positive">
                  <span className="trend-indicator">↗</span>
                  8.5% Up from yesterday
                </div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-header">
                  <h3 className="metric-title">Total Order</h3>
                  <div className="metric-icon order-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  </div>
                </div>
                <div className="metric-value">10293</div>
                <div className="metric-trend positive">
                  <span className="trend-indicator">↗</span>
                  1.3% Up from past week
                </div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-header">
                  <h3 className="metric-title">Total Sales</h3>
                  <div className="metric-icon sales-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="m17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </div>
                </div>
                <div className="metric-value">$89,000</div>
                <div className="metric-trend negative">
                  <span className="trend-indicator">↘</span>
                  4.3% Down from yesterday
                </div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-content">
                <div className="metric-header">
                  <h3 className="metric-title">Total Pending</h3>
                  <div className="metric-icon pending-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                  </div>
                </div>
                <div className="metric-value">2040</div>
                <div className="metric-trend positive">
                  <span className="trend-indicator">↗</span>
                  1.8% Up from yesterday
                </div>
              </div>
            </div>
          </div>

          {/* Sales Chart */}
          <div className="chart-section">
            <div className="chart-header">
              <h2 className="chart-title">Sales Details</h2>
              <select className="chart-filter">
                <option value="october">October</option>
                <option value="november">November</option>
                <option value="december">December</option>
              </select>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#5B93FF" 
                    strokeWidth={3}
                    dot={{ fill: '#5B93FF', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#5B93FF' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table Section */}
          <div className="table-section">
            <div className="table-header">
              <h2 className="table-title">Table</h2>
              <select className="table-filter">
                <option value="october">October</option>
                <option value="november">November</option>
                <option value="december">December</option>
              </select>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Location</th>
                    <th>Date - Time</th>
                    <th>Piece</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="product-cell">
                          <PlaceholderImage width={32} height={32} className="product-image" alt={item.productName} />
                          <span className="product-name">{item.productName}</span>
                        </div>
                      </td>
                      <td>{item.location}</td>
                      <td>{item.dateTime}</td>
                      <td>{item.piece}</td>
                      <td>{item.amount}</td>
                      <td>
                        <span className="status-badge delivered">{item.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
