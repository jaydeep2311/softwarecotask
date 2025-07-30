import { useState, useRef, useEffect } from 'react';

interface DateFilterProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export default function DateFilter({ selectedDate, onDateSelect }: DateFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 1)); // February 2024
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

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dateString = date.toISOString().split('T')[0];
    onDateSelect(dateString);
    setIsOpen(false);
  };

  const formatDisplayDate = () => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      return `${date.getDate()} Feb 2024`;
    }
    return 'Date';
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Previous month's trailing days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const prevMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate() - i;
      days.push(
        <button
          key={`prev-${prevMonthDate}`}
          className="calendar-day prev-month"
          onClick={() => {
            previousMonth();
            setTimeout(() => handleDateClick(prevMonthDate), 0);
          }}
        >
          {prevMonthDate}
        </button>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toISOString().split('T')[0];
      const isSelected = selectedDate === dateString;
      const isToday = day === 14; // Highlight the 14th as shown in the image

      days.push(
        <button
          key={day}
          className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </button>
      );
    }

    // Next month's leading days
    const remainingCells = 42 - days.length; // 6 rows × 7 days = 42 cells
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <button
          key={`next-${day}`}
          className="calendar-day next-month"
          onClick={() => {
            nextMonth();
            setTimeout(() => handleDateClick(day), 0);
          }}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button 
        className="filter-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {formatDisplayDate()}
        <span className="dropdown-arrow">▼</span>
      </button>
      
      {isOpen && (
        <div className="dropdown-content date-dropdown">
          <div className="calendar-header">
            <button onClick={previousMonth} className="nav-button">‹</button>
            <h3>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
            <button onClick={nextMonth} className="nav-button">›</button>
          </div>
          
          <div className="calendar-grid">
            <div className="calendar-days-header">
              {dayNames.map(day => (
                <div key={day} className="day-header">{day}</div>
              ))}
            </div>
            <div className="calendar-days">
              {renderCalendarDays()}
            </div>
          </div>
          
          <div className="calendar-footer">
            <p className="multiple-date-note">*You can choose multiple date</p>
            <button className="apply-btn" onClick={() => setIsOpen(false)}>
              Apply Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
