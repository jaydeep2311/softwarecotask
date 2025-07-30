import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { estimateAPI } from '../../services/mockApi';
import type { Estimate } from '../../services/mockApi';

export interface EstimateItem {
  id: string;
  title: string;
  description: string;
  unit: string;
  quantity: number;
  price: number;
  margin: number;
  total: number;
}

export interface EstimateSection {
  id: string;
  name: string;
  items: EstimateItem[];
  total: number;
}

interface EstimateFilters {
  status: string[];
  dateRange: { start: Date | null; end: Date | null };
  search: string;
  projectId?: string;
}

interface EstimateState {
  estimates: Estimate[];
  currentEstimate: Estimate | null;
  sections: EstimateSection[];
  isLoading: boolean;
  error: string | null;
  filters: EstimateFilters;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

const initialState: EstimateState = {
  estimates: [],
  currentEstimate: null,
  sections: [],
  isLoading: false,
  error: null,
  filters: {
    status: [],
    dateRange: { start: null, end: null },
    search: '',
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },
};

// Async thunks
export const fetchEstimates = createAsyncThunk(
  'estimates/fetchAll',
  async (params: { page?: number; filters?: Partial<EstimateFilters> } = {}, { rejectWithValue }) => {
    try {
      const response = await estimateAPI.getAll(params.page, params.filters);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch estimates');
    }
  }
);

export const fetchEstimateById = createAsyncThunk(
  'estimates/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await estimateAPI.getById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch estimate');
    }
  }
);

export const createEstimate = createAsyncThunk(
  'estimates/create',
  async (estimateData: Omit<Estimate, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const response = await estimateAPI.create(estimateData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create estimate');
    }
  }
);

export const updateEstimate = createAsyncThunk(
  'estimates/update',
  async ({ id, data }: { id: string; data: Partial<Estimate> }, { rejectWithValue }) => {
    try {
      const response = await estimateAPI.update(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update estimate');
    }
  }
);

export const deleteEstimate = createAsyncThunk(
  'estimates/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await estimateAPI.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete estimate');
    }
  }
);

const estimateSlice = createSlice({
  name: 'estimates',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<EstimateFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1;
    },
    clearFilters: (state) => {
      state.filters = {
        status: [],
        dateRange: { start: null, end: null },
        search: '',
      };
      state.pagination.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.currentPage = 1;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentEstimate: (state, action: PayloadAction<Estimate | null>) => {
      state.currentEstimate = action.payload;
    },
    // Estimate sections management
    setSections: (state, action: PayloadAction<EstimateSection[]>) => {
      state.sections = action.payload;
    },
    addSection: (state, action: PayloadAction<EstimateSection>) => {
      state.sections.push(action.payload);
    },
    updateSection: (state, action: PayloadAction<{ id: string; data: Partial<EstimateSection> }>) => {
      const index = state.sections.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.sections[index] = { ...state.sections[index], ...action.payload.data };
      }
    },
    removeSection: (state, action: PayloadAction<string>) => {
      state.sections = state.sections.filter(s => s.id !== action.payload);
    },
    addItemToSection: (state, action: PayloadAction<{ sectionId: string; item: EstimateItem }>) => {
      const section = state.sections.find(s => s.id === action.payload.sectionId);
      if (section) {
        section.items.push(action.payload.item);
        // Recalculate section total
        section.total = section.items.reduce((sum, item) => sum + item.total, 0);
      }
    },
    updateItemInSection: (state, action: PayloadAction<{ 
      sectionId: string; 
      itemId: string; 
      data: Partial<EstimateItem> 
    }>) => {
      const section = state.sections.find(s => s.id === action.payload.sectionId);
      if (section) {
        const itemIndex = section.items.findIndex(i => i.id === action.payload.itemId);
        if (itemIndex !== -1) {
          section.items[itemIndex] = { ...section.items[itemIndex], ...action.payload.data };
          
          // Recalculate item total if quantity, price, or margin changed
          const item = section.items[itemIndex];
          if ('quantity' in action.payload.data || 'price' in action.payload.data || 'margin' in action.payload.data) {
            const baseTotal = item.quantity * item.price;
            const marginAmount = baseTotal * (item.margin / 100);
            item.total = baseTotal + marginAmount;
          }
          
          // Recalculate section total
          section.total = section.items.reduce((sum, item) => sum + item.total, 0);
        }
      }
    },
    removeItemFromSection: (state, action: PayloadAction<{ sectionId: string; itemId: string }>) => {
      const section = state.sections.find(s => s.id === action.payload.sectionId);
      if (section) {
        section.items = section.items.filter(i => i.id !== action.payload.itemId);
        // Recalculate section total
        section.total = section.items.reduce((sum, item) => sum + item.total, 0);
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch Estimates
    builder
      .addCase(fetchEstimates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEstimates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.estimates = action.payload.estimates;
        state.pagination = {
          ...state.pagination,
          ...action.payload.pagination,
        };
      })
      .addCase(fetchEstimates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch Estimate By ID
    builder
      .addCase(fetchEstimateById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEstimateById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentEstimate = action.payload;
        // Load sections if they exist in the estimate
        if (action.payload.sections) {
          state.sections = action.payload.sections;
        }
      })
      .addCase(fetchEstimateById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create Estimate
    builder
      .addCase(createEstimate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createEstimate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.estimates.unshift(action.payload);
        state.pagination.totalItems += 1;
      })
      .addCase(createEstimate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update Estimate
    builder
      .addCase(updateEstimate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateEstimate.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.estimates.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.estimates[index] = action.payload;
        }
        if (state.currentEstimate?.id === action.payload.id) {
          state.currentEstimate = action.payload;
        }
      })
      .addCase(updateEstimate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Delete Estimate
    builder
      .addCase(deleteEstimate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteEstimate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.estimates = state.estimates.filter(e => e.id !== action.payload);
        state.pagination.totalItems -= 1;
        if (state.currentEstimate?.id === action.payload) {
          state.currentEstimate = null;
        }
      })
      .addCase(deleteEstimate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFilters,
  clearFilters,
  setCurrentPage,
  setItemsPerPage,
  clearError,
  setCurrentEstimate,
  setSections,
  addSection,
  updateSection,
  removeSection,
  addItemToSection,
  updateItemInSection,
  removeItemFromSection,
} = estimateSlice.actions;

export default estimateSlice.reducer;
