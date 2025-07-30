import { useState, useRef, useEffect } from 'react';

interface StatusFilterProps {
  selectedStatus: string;
  onStatusSelect: (status: string) => void;
}

const statusOptions = [
  { value: 'Completed', label: 'Completed' },
  { value: 'Processing', label: 'Processing' },
  { value: 'Rejected', label: 'Rejected' },
  { value: 'On Hold', label: 'On Hold' },
  { value: 'In Transit', label: 'In Transit' }
];

export default function StatusFilter({ selectedStatus, onStatusSelect }: StatusFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedStatuses, setTempSelectedStatuses] = useState<string[]>(['Completed', 'In Transit']);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStatusToggle = (status: string) => {
    setTempSelectedStatuses(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handleApply = () => {
    // For now, just select the first status for compatibility
    onStatusSelect(tempSelectedStatuses[0] || 'All Status');
    setIsOpen(false);
  };

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button
        className="filter-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        Status
        <span className="dropdown-arrow">▼</span>
      </button>

      {isOpen && (
        <div className="dropdown-content status-dropdown">
          <h3>Select Status</h3>

          <div className="status-pills">
            {statusOptions.map(option => {
              const isSelected = tempSelectedStatuses.includes(option.value);

              return (
                <button
                  key={option.value}
                  className={`status-pill ${isSelected ? 'active' : 'inactive'}`}
                  onClick={() => handleStatusToggle(option.value)}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div className="status-footer">
            <p className="multiple-status-note">*You can choose multiple status</p>
            <button className="apply-btn" onClick={handleApply}>
              Apply Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
