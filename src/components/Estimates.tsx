import { Link } from 'react-router-dom';
import './Projects.css';

interface Estimate {
  id: string;
  version: string;
  project: string;
  client: string;
  createdDate: string;
  lastModified: string;
  status: 'Created' | 'Processing' | 'Rejected' | 'On Hold' | 'In Transit';
}

const estimatesData: Estimate[] = [
  {
    id: '1',
    version: '00001',
    project: 'Christine Brooks',
    client: '089 Kutch Green Apt. 448',
    createdDate: '04 Sep 2019',
    lastModified: '12 Jan 2022',
    status: 'Created'
  },
  {
    id: '2',
    version: '00002',
    project: 'Rosie Pearson',
    client: '979 Immanuel Ferry Suite 526',
    createdDate: '28 May 2019',
    lastModified: '28 Jul 2024',
    status: 'Processing'
  },
  {
    id: '3',
    version: '00003',
    project: 'Darrell Caldwell',
    client: '8587 Frida Ports',
    createdDate: '23 Nov 2019',
    lastModified: '18 Mar 2022',
    status: 'Rejected'
  },
  {
    id: '4',
    version: '00004',
    project: 'Gilbert Johnston',
    client: '768 Destiny Lake Suite 600',
    createdDate: '05 Feb 2019',
    lastModified: '10 Dec 2021',
    status: 'Created'
  },
  {
    id: '5',
    version: '00005',
    project: 'Alan Cain',
    client: '042 Mylene Throughway',
    createdDate: '28 Jul 2019',
    lastModified: '21 Mar 2022',
    status: 'Processing'
  },
  {
    id: '6',
    version: '00006',
    project: 'Alfred Murray',
    client: '543 Weimann Mountain',
    createdDate: '15 Aug 2019',
    lastModified: '29 Apr 2023',
    status: 'Created'
  },
  {
    id: '7',
    version: '00007',
    project: 'Maggie Sullivan',
    client: 'New Scottieberg',
    createdDate: '21 Dec 2019',
    lastModified: '16 Nov 2023',
    status: 'Processing'
  },
  {
    id: '8',
    version: '00008',
    project: 'Rosie Todd',
    client: 'New Jon',
    createdDate: '30 Apr 2019',
    lastModified: '01 Mar 2023',
    status: 'On Hold'
  },
  {
    id: '9',
    version: '00009',
    project: 'Dollie Hines',
    client: '124 Lula Forge Suite 975',
    createdDate: '09 Jun 2019',
    lastModified: '23 Oct 2022',
    status: 'In Transit'
  }
];

export default function Estimates() {
  const getStatusBadge = (status: string) => {
    const statusClasses = {
      'Created': 'status-created',
      'Processing': 'status-processing',
      'Rejected': 'status-rejected',
      'On Hold': 'status-on-hold',
      'In Transit': 'status-in-transit'
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
          <Link to="/projects" className="nav-item">
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
          <Link to="/estimates" className="nav-item active">
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
            <h1>Estimates</h1>
            <div className="estimates-actions">
              <Link to="/estimates/add" className="add-project-btn">Add Estimate</Link>
            </div>
          </div>

          <div className="table-container">
            <table className="projects-table">
              <thead>
                <tr>
                  <th>VERSION</th>
                  <th>PROJECT</th>
                  <th>CLIENT</th>
                  <th>CREATED DATE</th>
                  <th>LAST MODIFIED</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {estimatesData.map(estimate => (
                  <tr key={estimate.id}>
                    <td>{estimate.version}</td>
                    <td>{estimate.project}</td>
                    <td>{estimate.client}</td>
                    <td>{estimate.createdDate}</td>
                    <td>{estimate.lastModified}</td>
                    <td>
                      <span className={getStatusBadge(estimate.status)}>
                        {estimate.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn">
                        ✏️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <span>Showing 1-10 of 76</span>
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
