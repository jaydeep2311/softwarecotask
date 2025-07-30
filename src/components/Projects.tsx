import { useState } from 'react';
import { Link } from 'react-router-dom';
import DateFilter from './DateFilter';
import ColumnsFilter from './ColumnsFilter';
import StatusFilter from './StatusFilter';
import './Projects.css';

interface Project {
  id: string;
  customer: string;
  refNumber: string;
  projectName: string;
  projectNumber: string;
  areaLocation: string;
  address: string;
  status: 'Processing' | 'On Track' | 'On Hold' | 'Rejected';
  dueDate: string;
}

const projectsData: Project[] = [
  {
    id: '1',
    customer: 'Olivia Martin',
    refNumber: 'RFRQRES7BST1LIV4',
    projectName: 'Sarah Williams',
    projectNumber: 'POSTO013R',
    areaLocation: 'Telangana',
    address: 'Mandal, Maharashtra',
    status: 'Processing',
    dueDate: '2024-02-15'
  },
  {
    id: '2',
    customer: 'Michael Jones',
    refNumber: 'G74156224AFQO7B8',
    projectName: 'Robert Johnson',
    projectNumber: 'ABCDE1234F',
    areaLocation: 'Uttar Pradesh',
    address: 'Bhiwani, Haryana',
    status: 'On Track',
    dueDate: '2024-02-18'
  },
  {
    id: '3',
    customer: 'John Doe',
    refNumber: '23PQRS44GT3BVF1',
    projectName: 'Isabella Anderson',
    projectNumber: 'XYZABC789C',
    areaLocation: 'Delhi',
    address: 'Areafc Tarik, Nadu',
    status: 'On Hold',
    dueDate: '2024-02-20'
  },
  {
    id: '4',
    customer: 'Ella Lewis',
    refNumber: '78GTAV234KWXTR8',
    projectName: 'Christopher White',
    projectNumber: 'POSTO013R',
    areaLocation: 'Karnataka',
    address: 'North Dum, West Bengal',
    status: 'Processing',
    dueDate: '2024-02-22'
  },
  {
    id: '5',
    customer: 'James Rodriguez',
    refNumber: '45KLM98DFQC284',
    projectName: 'Jane Smith',
    projectNumber: 'RSTUV56128',
    areaLocation: 'Andhra Pradesh',
    address: 'Jharkhand, Andhra Pradesh',
    status: 'Rejected',
    dueDate: '2024-02-25'
  }
];

const allColumns = [
  { key: 'customer', label: 'CUSTOMER' },
  { key: 'refNumber', label: 'REF NUMBER' },
  { key: 'projectName', label: 'PROJECT NAME' },
  { key: 'projectNumber', label: 'PROJECT NUMBER' },
  { key: 'areaLocation', label: 'AREA LOCATION' },
  { key: 'address', label: 'ADDRESS' },
  { key: 'status', label: 'STATUS' },
  { key: 'dueDate', label: 'DUE DATE' }
];

export default function Projects() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    allColumns.map(col => col.key)
  );
  const [selectedStatus, setSelectedStatus] = useState<string>('All Status');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projectsData);

  const handleDateFilter = (date: string) => {
    setSelectedDate(date);
    filterProjects(date, selectedStatus);
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    filterProjects(selectedDate, status);
  };

  const filterProjects = (date: string, status: string) => {
    let filtered = projectsData;

    if (date) {
      filtered = filtered.filter(project => project.dueDate === date);
    }

    if (status && status !== 'All Status') {
      filtered = filtered.filter(project => project.status === status);
    }

    setFilteredProjects(filtered);
  };

  const handleResetFilter = () => {
    setSelectedDate('');
    setSelectedStatus('All Status');
    setFilteredProjects(projectsData);
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      'Processing': 'status-processing',
      'On Track': 'status-on-track',
      'On Hold': 'status-on-hold',
      'Rejected': 'status-rejected'
    };
    return `status-badge ${statusClasses[status as keyof typeof statusClasses]}`;
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

        <div className="projects-container">
          <div className="projects-header">
            <h1>Projects</h1>
            <div className="projects-filters">
              <div className="filter-group">
                <span className="filter-icon">🗂️</span>
                <span>Filter By</span>
              </div>
              
              <DateFilter 
                selectedDate={selectedDate}
                onDateSelect={handleDateFilter}
              />
              
              <ColumnsFilter 
                allColumns={allColumns}
                visibleColumns={visibleColumns}
                onColumnsChange={setVisibleColumns}
              />
              
              <StatusFilter 
                selectedStatus={selectedStatus}
                onStatusSelect={handleStatusFilter}
              />
              
              <button className="reset-filter" onClick={handleResetFilter}>
                🔄 Reset Filter
              </button>
              
              <Link to="/projects/add" className="add-project-btn">Add Project</Link>
            </div>
          </div>

          <div className="table-container">
            <table className="projects-table">
              <thead>
                <tr>
                  {allColumns
                    .filter(col => visibleColumns.includes(col.key))
                    .map(column => (
                      <th key={column.key}>{column.label}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map(project => (
                  <tr key={project.id}>
                    {visibleColumns.includes('customer') && <td>{project.customer}</td>}
                    {visibleColumns.includes('refNumber') && <td>{project.refNumber}</td>}
                    {visibleColumns.includes('projectName') && <td>{project.projectName}</td>}
                    {visibleColumns.includes('projectNumber') && <td>{project.projectNumber}</td>}
                    {visibleColumns.includes('areaLocation') && <td>{project.areaLocation}</td>}
                    {visibleColumns.includes('address') && <td>{project.address}</td>}
                    {visibleColumns.includes('status') && (
                      <td>
                        <span className={getStatusBadge(project.status)}>
                          {project.status}
                        </span>
                      </td>
                    )}
                    {visibleColumns.includes('dueDate') && <td>{project.dueDate}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <span>Showing 1-10 of 75</span>
            <div className="pagination">
              <button className="pagination-btn">‹</button>
              <button className="pagination-btn">›</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
