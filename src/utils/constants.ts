// API Constants
export const API_ENDPOINTS = {
  PROJECTS: '/api/projects',
  ESTIMATES: '/api/estimates',
  AUTH: '/api/auth',
  DASHBOARD: '/api/dashboard'
} as const;

// Status Constants
export const PROJECT_STATUS = {
  PROCESSING: 'Processing',
  ON_TRACK: 'On Track',
  ON_HOLD: 'On Hold',
  COMPLETED: 'Completed',
  REJECTED: 'Rejected'
} as const;

export const ESTIMATE_STATUS = {
  CREATED: 'Created',
  PROCESSING: 'Processing',
  REJECTED: 'Rejected',
  ON_HOLD: 'On Hold',
  IN_TRANSIT: 'In Transit'
} as const;

// Validation Constants
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  USERNAME_MIN_LENGTH: 3,
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters',
  USERNAME_TOO_SHORT: 'Username must be at least 3 characters'
} as const;

// UI Constants
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100]
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  LANGUAGE: 'selected_language'
} as const;

// Default Values
export const DEFAULT_VALUES = {
  CURRENCY: '$',
  DECIMAL_PLACES: 2,
  DATE_FORMAT: 'YYYY-MM-DD'
} as const;
