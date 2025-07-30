import { VALIDATION_RULES } from './constants';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FormData {
  [key: string]: any;
}

// Email validation
export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!email.trim()) {
    errors.push(VALIDATION_RULES.REQUIRED_FIELD);
  } else if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) {
    errors.push(VALIDATION_RULES.INVALID_EMAIL);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Password validation
export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!password.trim()) {
    errors.push(VALIDATION_RULES.REQUIRED_FIELD);
  } else if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    errors.push(VALIDATION_RULES.PASSWORD_TOO_SHORT);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Username validation
export const validateUsername = (username: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!username.trim()) {
    errors.push(VALIDATION_RULES.REQUIRED_FIELD);
  } else if (username.length < VALIDATION_RULES.USERNAME_MIN_LENGTH) {
    errors.push(VALIDATION_RULES.USERNAME_TOO_SHORT);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Required field validation
export const validateRequired = (value: string, fieldName?: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!value.trim()) {
    errors.push(fieldName ? `${fieldName} is required` : VALIDATION_RULES.REQUIRED_FIELD);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Form validation
export const validateForm = (formData: FormData, rules: Record<string, (value: any) => ValidationResult>): ValidationResult => {
  let allErrors: string[] = [];
  
  Object.keys(rules).forEach(field => {
    const validation = rules[field](formData[field]);
    if (!validation.isValid) {
      allErrors = [...allErrors, ...validation.errors];
    }
  });
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  };
};

// Login form validation
export const validateLoginForm = (email: string, password: string): ValidationResult => {
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);
  
  return {
    isValid: emailValidation.isValid && passwordValidation.isValid,
    errors: [...emailValidation.errors, ...passwordValidation.errors]
  };
};

// Register form validation
export const validateRegisterForm = (email: string, username: string, password: string, acceptTerms: boolean): ValidationResult => {
  const emailValidation = validateEmail(email);
  const usernameValidation = validateUsername(username);
  const passwordValidation = validatePassword(password);
  
  let errors = [...emailValidation.errors, ...usernameValidation.errors, ...passwordValidation.errors];
  
  if (!acceptTerms) {
    errors.push('You must accept the terms and conditions');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
