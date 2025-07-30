import { generateId, formatDate } from '../utils/helpers';
import { PROJECT_STATUS, ESTIMATE_STATUS } from '../utils/constants';

// Types
export interface Project {
  id: string;
  customer: string;
  refNumber: string;
  projectName: string;
  projectNumber: string;
  areaLocation: string;
  address: string;
  status: string;
  dueDate: string;
  contact: string;
  manager: string;
  staff: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface EstimateItem {
  id: string;
  itemName: string;
  description: string;
  unit: string;
  quantity: number;
  price: number;
  margin: number;
}

export interface EstimateSection {
  id: string;
  sectionName: string;
  items: EstimateItem[];
}

export interface Estimate {
  id: string;
  version: string;
  project: string;
  client: string;
  createdDate: string;
  lastModified: string;
  status: string;
  sections: EstimateSection[];
  totalAmount: number;
}

export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role: string;
  createdAt: string;
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalEstimates: number;
  revenueThisMonth: number;
  projectStatusDistribution: Array<{ status: string; count: number }>;
  monthlyRevenue: Array<{ month: string; revenue: number }>;
  recentActivities: Array<{ id: string; type: string; description: string; timestamp: string }>;
}

// Mock Data
let mockProjects: Project[] = [
  {
    id: '1',
    customer: 'Olivia Martin',
    refNumber: 'RFRQRES7BST1LIV4',
    projectName: 'Sarah Williams',
    projectNumber: 'POSTO013R',
    areaLocation: 'Telangana',
    address: 'Mandal, Maharashtra',
    status: PROJECT_STATUS.PROCESSING,
    dueDate: '2024-02-15',
    contact: '+1234567890',
    manager: 'John Manager',
    staff: 'Team Lead',
    email: 'olivia@example.com',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    customer: 'Michael Jones',
    refNumber: 'G74156224AFQO7B8',
    projectName: 'Robert Johnson',
    projectNumber: 'ABCDE1234F',
    areaLocation: 'Uttar Pradesh',
    address: 'Bhiwani, Haryana',
    status: PROJECT_STATUS.ON_TRACK,
    dueDate: '2024-02-18',
    contact: '+1234567891',
    manager: 'Jane Manager',
    staff: 'Senior Developer',
    email: 'michael@example.com',
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16'
  },
  {
    id: '3',
    customer: 'John Doe',
    refNumber: '23PQRS44GT3BVF1',
    projectName: 'Isabella Anderson',
    projectNumber: 'XYZABC789C',
    areaLocation: 'Delhi',
    address: 'Areafc Tarik, Nadu',
    status: PROJECT_STATUS.ON_HOLD,
    dueDate: '2024-02-20',
    contact: '+1234567892',
    manager: 'Bob Manager',
    staff: 'Designer',
    email: 'john@example.com',
    createdAt: '2024-01-17',
    updatedAt: '2024-01-17'
  }
];

let mockEstimates: Estimate[] = [
  {
    id: '1',
    version: '00001',
    project: 'Christine Brooks',
    client: '089 Kutch Green Apt. 448',
    createdDate: '04 Sep 2019',
    lastModified: '12 Jan 2022',
    status: ESTIMATE_STATUS.CREATED,
    sections: [
      {
        id: '1',
        sectionName: 'Electric',
        items: [
          { id: '1-1', itemName: 'Lamps', description: 'LED Lamps', unit: 'QTY', quantity: 100, price: 120, margin: 0 },
          { id: '1-2', itemName: 'Wires', description: 'Copper Wires', unit: 'Meter', quantity: 20, price: 200, margin: 0 }
        ]
      }
    ],
    totalAmount: 16000
  },
  {
    id: '2',
    version: '00002',
    project: 'Rosie Pearson',
    client: '979 Immanuel Ferry Suite 526',
    createdDate: '28 May 2019',
    lastModified: '28 Jul 2024',
    status: ESTIMATE_STATUS.PROCESSING,
    sections: [
      {
        id: '2',
        sectionName: 'Materials',
        items: [
          { id: '2-1', itemName: 'Cement', description: 'High Grade Cement', unit: 'Bags', quantity: 50, price: 150, margin: 5 }
        ]
      }
    ],
    totalAmount: 7875
  }
];

let mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    username: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    email: 'user@example.com',
    username: 'user',
    firstName: 'Regular',
    lastName: 'User',
    role: 'user',
    createdAt: '2024-01-01'
  }
];

// Simulate API delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    await delay();
    
    const user = mockUsers.find(u => u.email === email);
    if (!user || password !== 'password123') {
      throw new Error('Invalid credentials');
    }
    
    return {
      user,
      token: 'mock-jwt-token-' + generateId()
    };
  },

  register: async (email: string, username: string, password: string): Promise<{ user: User; token: string }> => {
    await delay();
    
    if (mockUsers.some(u => u.email === email)) {
      throw new Error('Email already exists');
    }
    
    if (mockUsers.some(u => u.username === username)) {
      throw new Error('Username already exists');
    }
    
    const newUser: User = {
      id: generateId(),
      email,
      username,
      role: 'user',
      createdAt: formatDate(new Date())
    };
    
    mockUsers.push(newUser);
    
    return {
      user: newUser,
      token: 'mock-jwt-token-' + generateId()
    };
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    await delay();
    
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Email not found');
    }
    
    return {
      message: 'Password reset instructions have been sent to your email.'
    };
  }
};

// Enhanced interfaces for API responses
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface ProjectFilters {
  status?: string[];
  dateRange?: { start: Date | null; end: Date | null };
  search?: string;
}

export interface EstimateFilters {
  status?: string[];
  dateRange?: { start: Date | null; end: Date | null };
  search?: string;
  projectId?: string;
}

// Projects API
export const projectAPI = {
  getAll: async (page = 1, filters?: Partial<ProjectFilters>): Promise<{ projects: Project[]; pagination: any }> => {
    await delay();

    let filteredProjects = [...mockProjects];

    // Apply filters
    if (filters?.status && filters.status.length > 0) {
      filteredProjects = filteredProjects.filter(p => filters.status!.includes(p.status));
    }

    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProjects = filteredProjects.filter(p =>
        p.projectName.toLowerCase().includes(searchTerm) ||
        p.customer.toLowerCase().includes(searchTerm) ||
        p.refNumber.toLowerCase().includes(searchTerm)
      );
    }

    if (filters?.dateRange?.start && filters?.dateRange?.end) {
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      filteredProjects = filteredProjects.filter(p => {
        const projectDate = new Date(p.createdAt);
        return projectDate >= startDate && projectDate <= endDate;
      });
    }

    // Pagination
    const itemsPerPage = 10;
    const totalItems = filteredProjects.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const projects = filteredProjects.slice(startIndex, endIndex);

    return {
      projects,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage
      }
    };
  },

  getById: async (id: string): Promise<Project> => {
    await delay();
    const project = mockProjects.find(p => p.id === id);
    if (!project) {
      throw new Error('Project not found');
    }
    return { ...project };
  },

  create: async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
    await delay();
    
    const newProject: Project = {
      ...projectData,
      id: generateId(),
      createdAt: formatDate(new Date()),
      updatedAt: formatDate(new Date())
    };
    
    mockProjects.push(newProject);
    return { ...newProject };
  },

  update: async (id: string, projectData: Partial<Project>): Promise<Project> => {
    await delay();
    
    const index = mockProjects.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Project not found');
    }
    
    mockProjects[index] = {
      ...mockProjects[index],
      ...projectData,
      updatedAt: formatDate(new Date())
    };
    
    return { ...mockProjects[index] };
  },

  delete: async (id: string): Promise<void> => {
    await delay();
    
    const index = mockProjects.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Project not found');
    }
    
    mockProjects.splice(index, 1);
  }
};

// Estimates API
export const estimateAPI = {
  getAll: async (page = 1, filters?: Partial<EstimateFilters>): Promise<{ estimates: Estimate[]; pagination: any }> => {
    await delay();

    let filteredEstimates = [...mockEstimates];

    // Apply filters
    if (filters?.status && filters.status.length > 0) {
      filteredEstimates = filteredEstimates.filter(e => filters.status!.includes(e.status));
    }

    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredEstimates = filteredEstimates.filter(e =>
        e.project.toLowerCase().includes(searchTerm) ||
        e.client.toLowerCase().includes(searchTerm) ||
        e.version.toLowerCase().includes(searchTerm)
      );
    }

    if (filters?.projectId) {
      filteredEstimates = filteredEstimates.filter(e => e.project === filters.projectId);
    }

    if (filters?.dateRange?.start && filters?.dateRange?.end) {
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      filteredEstimates = filteredEstimates.filter(e => {
        const estimateDate = new Date(e.createdDate);
        return estimateDate >= startDate && estimateDate <= endDate;
      });
    }

    // Pagination
    const itemsPerPage = 10;
    const totalItems = filteredEstimates.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const estimates = filteredEstimates.slice(startIndex, endIndex);

    return {
      estimates,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage
      }
    };
  },

  getById: async (id: string): Promise<Estimate> => {
    await delay();
    const estimate = mockEstimates.find(e => e.id === id);
    if (!estimate) {
      throw new Error('Estimate not found');
    }
    return { ...estimate };
  },

  create: async (estimateData: Omit<Estimate, 'id' | 'version' | 'createdDate' | 'lastModified'>): Promise<Estimate> => {
    await delay();
    
    const newEstimate: Estimate = {
      ...estimateData,
      id: generateId(),
      version: String(mockEstimates.length + 1).padStart(5, '0'),
      createdDate: formatDate(new Date(), 'DD MMM YYYY'),
      lastModified: formatDate(new Date(), 'DD MMM YYYY')
    };
    
    mockEstimates.push(newEstimate);
    return { ...newEstimate };
  },

  update: async (id: string, estimateData: Partial<Estimate>): Promise<Estimate> => {
    await delay();
    
    const index = mockEstimates.findIndex(e => e.id === id);
    if (index === -1) {
      throw new Error('Estimate not found');
    }
    
    mockEstimates[index] = {
      ...mockEstimates[index],
      ...estimateData,
      lastModified: formatDate(new Date(), 'DD MMM YYYY')
    };
    
    return { ...mockEstimates[index] };
  },

  delete: async (id: string): Promise<void> => {
    await delay();
    
    const index = mockEstimates.findIndex(e => e.id === id);
    if (index === -1) {
      throw new Error('Estimate not found');
    }
    
    mockEstimates.splice(index, 1);
  }
};

// Legacy aliases for backward compatibility
export const projectsAPI = projectAPI;
export const estimatesAPI = estimateAPI;

// Dashboard API
export const dashboardAPI = {
  getStats: async (): Promise<DashboardStats> => {
    await delay();
    
    const totalProjects = mockProjects.length;
    const activeProjects = mockProjects.filter(p => 
      p.status === PROJECT_STATUS.PROCESSING || p.status === PROJECT_STATUS.ON_TRACK
    ).length;
    const completedProjects = mockProjects.filter(p => p.status === PROJECT_STATUS.COMPLETED).length;
    
    const projectStatusDistribution = Object.values(PROJECT_STATUS).map(status => ({
      status,
      count: mockProjects.filter(p => p.status === status).length
    }));
    
    const monthlyRevenue = [
      { month: 'Jan', revenue: 45000 },
      { month: 'Feb', revenue: 52000 },
      { month: 'Mar', revenue: 48000 },
      { month: 'Apr', revenue: 61000 },
      { month: 'May', revenue: 55000 },
      { month: 'Jun', revenue: 67000 }
    ];
    
    const recentActivities = [
      { id: '1', type: 'project', description: 'New project created: Sarah Williams', timestamp: '2024-01-20T10:30:00Z' },
      { id: '2', type: 'estimate', description: 'Estimate updated: Christine Brooks', timestamp: '2024-01-20T09:15:00Z' },
      { id: '3', type: 'project', description: 'Project completed: Robert Johnson', timestamp: '2024-01-19T16:45:00Z' }
    ];
    
    return {
      totalProjects,
      activeProjects,
      completedProjects,
      totalEstimates: mockEstimates.length,
      revenueThisMonth: 67000,
      projectStatusDistribution,
      monthlyRevenue,
      recentActivities
    };
  }
};
