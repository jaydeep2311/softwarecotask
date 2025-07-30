import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EstimateForm.css';

interface EstimateItem {
  id: string;
  itemName: string;
  description: string;
  unit: string;
  quantity: number;
  price: number;
  margin: number;
}

interface EstimateSection {
  id: string;
  sectionName: string;
  items: EstimateItem[];
}

export default function AddEstimate() {
  const navigate = useNavigate();
  
  const [sections, setSections] = useState<EstimateSection[]>([
    {
      id: '1',
      sectionName: 'Sample Section',
      items: [
        { id: '1-1', itemName: '', description: '', unit: '', quantity: 0, price: 0, margin: 0 },
        { id: '1-2', itemName: '', description: '', unit: '', quantity: 0, price: 0, margin: 0 },
        { id: '1-3', itemName: '', description: '', unit: '', quantity: 0, price: 0, margin: 0 }
      ]
    },
    {
      id: '2',
      sectionName: 'Sample Section',
      items: [
        { id: '2-1', itemName: '', description: '', unit: '', quantity: 0, price: 0, margin: 0 },
        { id: '2-2', itemName: '', description: '', unit: '', quantity: 0, price: 0, margin: 0 },
        { id: '2-3', itemName: '', description: '', unit: '', quantity: 0, price: 0, margin: 0 }
      ]
    }
  ]);

  const handleItemChange = (sectionId: string, itemId: string, field: keyof EstimateItem, value: string | number) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            items: section.items.map(item => 
              item.id === itemId 
                ? { ...item, [field]: value }
                : item
            )
          }
        : section
    ));
  };

  const handleSectionNameChange = (sectionId: string, newName: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, sectionName: newName }
        : section
    ));
  };

  const addItemToSection = (sectionId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            items: [...section.items, {
              id: `${sectionId}-${section.items.length + 1}`,
              itemName: '',
              description: '',
              unit: '',
              quantity: 0,
              price: 0,
              margin: 0
            }]
          }
        : section
    ));
  };

  const removeItemFromSection = (sectionId: string, itemId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            items: section.items.filter(item => item.id !== itemId)
          }
        : section
    ));
  };

  const calculateTotals = () => {
    let subTotal = 0;
    let totalMargin = 0;

    sections.forEach(section => {
      section.items.forEach(item => {
        const itemTotal = item.quantity * item.price;
        const itemMargin = (itemTotal * item.margin) / 100;
        subTotal += itemTotal;
        totalMargin += itemMargin;
      });
    });

    return {
      subTotal,
      totalMargin,
      totalAmount: subTotal + totalMargin
    };
  };

  const totals = calculateTotals();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding new estimate:', sections);
    navigate('/estimates');
  };

  const handleCancel = () => {
    navigate('/estimates');
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

        <div className="estimate-form-container">
          <h1 className="form-title">Add New Estimates</h1>
          
          <form onSubmit={handleSubmit} className="estimate-form">
            <div className="estimate-table">
              <div className="table-header">
                <div className="col-item">ITEM</div>
                <div className="col-description">DESCRIPTION</div>
                <div className="col-unit">UNIT</div>
                <div className="col-quantity">QUANTITY</div>
                <div className="col-price">PRICE ($)</div>
                <div className="col-margin">MARGIN (%)</div>
                <div className="col-actions"></div>
              </div>

              {sections.map((section, sectionIndex) => (
                <div key={section.id} className="estimate-section">
                  <div className="section-header">
                    <span className="section-number">{sectionIndex + 1}</span>
                    <input
                      type="text"
                      value={section.sectionName}
                      onChange={(e) => handleSectionNameChange(section.id, e.target.value)}
                      className="section-name-input"
                      placeholder="Section Name"
                    />
                    <div className="section-total">0.00</div>
                    <div className="section-currency">$</div>
                  </div>

                  {section.items.map((item) => (
                    <div key={item.id} className="estimate-row">
                      <div className="col-item">
                        <input
                          type="text"
                          value={item.itemName}
                          onChange={(e) => handleItemChange(section.id, item.id, 'itemName', e.target.value)}
                          placeholder="Item Name"
                          className="item-input"
                        />
                      </div>
                      <div className="col-description">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleItemChange(section.id, item.id, 'description', e.target.value)}
                          placeholder="Item Description"
                          className="item-input"
                        />
                      </div>
                      <div className="col-unit">
                        <input
                          type="text"
                          value={item.unit}
                          onChange={(e) => handleItemChange(section.id, item.id, 'unit', e.target.value)}
                          placeholder="Unit"
                          className="item-input"
                        />
                      </div>
                      <div className="col-quantity">
                        <input
                          type="number"
                          value={item.quantity || ''}
                          onChange={(e) => handleItemChange(section.id, item.id, 'quantity', parseInt(e.target.value) || 0)}
                          placeholder="Quantity"
                          className="item-input"
                        />
                      </div>
                      <div className="col-price">
                        <input
                          type="number"
                          value={item.price || ''}
                          onChange={(e) => handleItemChange(section.id, item.id, 'price', parseFloat(e.target.value) || 0)}
                          placeholder="Price"
                          className="item-input"
                        />
                      </div>
                      <div className="col-margin">
                        <input
                          type="number"
                          value={item.margin || ''}
                          onChange={(e) => handleItemChange(section.id, item.id, 'margin', parseFloat(e.target.value) || 0)}
                          placeholder="Margin"
                          className="item-input"
                        />
                      </div>
                      <div className="col-actions">
                        <button
                          type="button"
                          onClick={() => addItemToSection(section.id)}
                          className="action-btn add-btn"
                        >
                          ➕
                        </button>
                        {section.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItemFromSection(section.id, item.id)}
                            className="action-btn remove-btn"
                          >
                            ➖
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="estimate-totals">
              <div className="total-row">
                <span className="total-label">Sub Total</span>
                <span className="total-value">$ {totals.subTotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span className="total-label">Total Margin</span>
                <span className="total-value">$ {totals.totalMargin.toFixed(2)}</span>
              </div>
              <div className="total-row final-total">
                <span className="total-label">Total Amount</span>
                <span className="total-value">$ {totals.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={handleCancel} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
