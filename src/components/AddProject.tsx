import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProjectForm.css';

export default function AddProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer: '',
    referenceNumber: '',
    projectName: '',
    projectNumber: '',
    areaLocation: '',
    address: '',
    dueDate: '',
    contact: '',
    manager: '',
    staff: '',
    status: '',
    email: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding new project:', formData);
    // Here you would typically send the data to your backend
    navigate('/projects');
  };

  const handleCancel = () => {
    navigate('/projects');
  };

  return (
    <div className="projects-layout">
      <aside className="sidebar">
        <div className="logo">LOGO</div>
        <nav className="sidebar-nav">
          <Link to="/" className="nav-item">
            <span className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
              </svg>
            </span>
            Dashboard
          </Link>
          <Link to="/projects" className="nav-item active">
            <span className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          <div className="nav-item">
            <span className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16,17 21,12 16,7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </span>
            Logout
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="header-left">
            <button className="menu-btn">☰</button>
            <div className="search-container">
              <input type="text" placeholder="Search" className="search-input" />
              <span className="search-icon">🔍</span>
            </div>
          </div>
          <div className="header-right">
            <div className="header-icons">
              <span className="icon">🔔</span>
              <span className="icon">🇬🇧</span>
              <span className="language">English</span>
              <div className="profile">
                <img src="/api/placeholder/32/32" alt="Profile" className="profile-img" />
                <span>Harley</span>
              </div>
              <span className="icon">🌙</span>
            </div>
          </div>
        </header>

        <div className="project-form-container">
          <h1 className="form-title">Add New Project</h1>
          
          <form onSubmit={handleSubmit} className="project-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="customer">Customer</label>
                <select
                  id="customer"
                  name="customer"
                  value={formData.customer}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Select customer</option>
                  <option value="Olivia Martin">Olivia Martin</option>
                  <option value="Michael Jones">Michael Jones</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Ella Lewis">Ella Lewis</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="referenceNumber">Reference Number</label>
                <input
                  type="text"
                  id="referenceNumber"
                  name="referenceNumber"
                  value={formData.referenceNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your reference number"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="projectName">Project Name</label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  placeholder="Enter your project name"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="projectNumber">Project Number</label>
                <input
                  type="text"
                  id="projectNumber"
                  name="projectNumber"
                  value={formData.projectNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your project number"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="areaLocation">Area Location</label>
                <input
                  type="text"
                  id="areaLocation"
                  name="areaLocation"
                  value={formData.areaLocation}
                  onChange={handleInputChange}
                  placeholder="Enter your project area location"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your project address"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dueDate">Due Date</label>
                <div className="date-input-container">
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="form-input date-input"
                    required
                  />
                  <span className="calendar-icon">📅</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact">Contact</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="Enter your contact"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="manager">Manager</label>
                <input
                  type="text"
                  id="manager"
                  name="manager"
                  value={formData.manager}
                  onChange={handleInputChange}
                  placeholder="Select project manager"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="staff">Staff</label>
                <select
                  id="staff"
                  name="staff"
                  value={formData.staff}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Select project staff</option>
                  <option value="Sarah Williams">Sarah Williams</option>
                  <option value="Robert Johnson">Robert Johnson</option>
                  <option value="Isabella Anderson">Isabella Anderson</option>
                  <option value="Christopher White">Christopher White</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Select project status</option>
                  <option value="Processing">Processing</option>
                  <option value="On Track">On Track</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Add Now
              </button>
              <button type="button" onClick={handleCancel} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
