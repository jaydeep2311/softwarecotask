import { useState, useRef, useEffect } from 'react';

interface Column {
  key: string;
  label: string;
}

interface ColumnsFilterProps {
  allColumns: Column[];
  visibleColumns: string[];
  onColumnsChange: (columns: string[]) => void;
}

export default function ColumnsFilter({ allColumns, visibleColumns, onColumnsChange }: ColumnsFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempVisibleColumns, setTempVisibleColumns] = useState<string[]>(visibleColumns);
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

  useEffect(() => {
    setTempVisibleColumns(visibleColumns);
  }, [visibleColumns]);

  const handleColumnToggle = (columnKey: string) => {
    setTempVisibleColumns(prev =>
      prev.includes(columnKey)
        ? prev.filter(key => key !== columnKey)
        : [...prev, columnKey]
    );
  };

  const handleApply = () => {
    onColumnsChange(tempVisibleColumns);
    setIsOpen(false);
  };

  const getColumnDisplayName = (columnKey: string) => {
    if (columnKey === 'customer') return 'CONTACT';
    if (columnKey === 'refNumber') return 'REF NUMBER';
    if (columnKey === 'projectName') return 'COMMENTS';
    if (columnKey === 'projectNumber') return 'DUE DATE';
    if (columnKey === 'areaLocation') return 'PROJECT LOCATION';
    if (columnKey === 'address') return 'CUSTOMER';
    if (columnKey === 'status') return 'STATUS';
    if (columnKey === 'dueDate') return 'DUE DATE';
    return columnKey.toUpperCase();
  };

  const isColumnActive = (columnKey: string) => {
    return columnKey === 'customer' || columnKey === 'status';
  };

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button
        className="filter-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        Hide Columns
        <span className="dropdown-arrow">▼</span>
      </button>

      {isOpen && (
        <div className="dropdown-content columns-dropdown">
          <h3>Select Columns</h3>

          <div className="columns-pills">
            {allColumns.map(column => {
              const isVisible = tempVisibleColumns.includes(column.key);
              const isActive = isColumnActive(column.key);
              const displayName = getColumnDisplayName(column.key);

              return (
                <button
                  key={column.key}
                  className={`column-pill ${isActive ? 'active' : 'inactive'}`}
                  onClick={() => handleColumnToggle(column.key)}
                >
                  {displayName}
                </button>
              );
            })}
          </div>

          <div className="columns-footer">
            <p className="multiple-columns-note">*You can choose multiple Columns to hide</p>
            <button className="apply-btn" onClick={handleApply}>
              Apply Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
