import { DEFAULT_VALUES } from './constants';

// Format currency
export const formatCurrency = (amount: number, currency = DEFAULT_VALUES.CURRENCY): string => {
  return `${currency} ${amount.toLocaleString('en-US', { 
    minimumFractionDigits: DEFAULT_VALUES.DECIMAL_PLACES,
    maximumFractionDigits: DEFAULT_VALUES.DECIMAL_PLACES 
  })}`;
};

// Calculate item total with margin
export const calculateItemTotal = (quantity: number, price: number, margin: number = 0): number => {
  const baseTotal = quantity * price;
  const marginAmount = (baseTotal * margin) / 100;
  return baseTotal + marginAmount;
};

// Calculate section total
export const calculateSectionTotal = (items: Array<{quantity: number, price: number, margin?: number}>): number => {
  return items.reduce((total, item) => {
    return total + calculateItemTotal(item.quantity, item.price, item.margin || 0);
  }, 0);
};

// Generate unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Format date
export const formatDate = (date: string | Date, format = DEFAULT_VALUES.DATE_FORMAT): string => {
  const d = new Date(date);
  
  if (format === 'DD MMM YYYY') {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getDate().toString().padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }
  
  return d.toISOString().split('T')[0];
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Deep clone object
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

// Filter array by search term
export const filterBySearch = <T>(
  items: T[],
  searchTerm: string,
  searchFields: (keyof T)[]
): T[] => {
  if (!searchTerm.trim()) return items;
  
  const term = searchTerm.toLowerCase();
  
  return items.filter(item =>
    searchFields.some(field => {
      const value = item[field];
      return value && String(value).toLowerCase().includes(term);
    })
  );
};

// Sort array by field
export const sortByField = <T>(
  items: T[],
  field: keyof T,
  direction: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...items].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

// Paginate array
export const paginate = <T>(
  items: T[],
  page: number,
  pageSize: number
): { items: T[], totalPages: number, totalItems: number } => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  return {
    items: items.slice(startIndex, endIndex),
    totalPages: Math.ceil(items.length / pageSize),
    totalItems: items.length
  };
};

// Get status badge class
export const getStatusBadgeClass = (status: string): string => {
  const statusMap: Record<string, string> = {
    'Processing': 'status-processing',
    'On Track': 'status-on-track',
    'On Hold': 'status-on-hold',
    'Completed': 'status-completed',
    'Rejected': 'status-rejected',
    'Created': 'status-created',
    'In Transit': 'status-in-transit'
  };
  
  return `status-badge ${statusMap[status] || 'status-default'}`;
};

// Local storage helpers
export const getFromStorage = (key: string, defaultValue: any = null): any => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const setToStorage = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

export const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};
