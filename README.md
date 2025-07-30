# Admin Panel - Project & Estimation Management System

A comprehensive admin panel built with React, TypeScript, Redux Toolkit, and i18next for managing projects and estimates with full internationalization support.

## 🚀 Features

### Authentication & Security
- **Secure Login/Register System** with form validation
- **Forgot Password** functionality with mock email verification
- **Protected Routes** with role-based access control
- **JWT Token Management** with automatic session handling
- **Redux State Management** for authentication flow

### Project Management
- **Full CRUD Operations** (Create, Read, Update, Delete)
- **Advanced Filtering** by status, date range, and search terms
- **Pagination Support** for large datasets
- **Real-time Search** across project names, customers, and reference numbers
- **Status Tracking** (Processing, On Track, On Hold, Rejected, Completed)

### Estimation System
- **Dynamic Estimate Creation** with multiple sections and items
- **Item Calculation Engine** with automatic totals and margin calculations
- **Section-based Organization** for complex estimates
- **Formula**: `Item Total = (Quantity × Price) + (Margin % of (Quantity × Price))`
- **Advanced Filtering** and search capabilities
- **Export-ready Structure** for PDF generation

### Dashboard & Analytics
- **Comprehensive Dashboard** with key metrics and charts
- **Real-time Statistics** for projects and estimates
- **Interactive Charts** using Recharts library
- **Revenue Tracking** with monthly breakdown
- **Recent Activities** timeline

### Internationalization (i18n)
- **Multi-language Support** (English, Spanish, French)
- **Browser Language Detection** with localStorage persistence
- **Complete Translation Coverage** for all UI elements
- **Easy Language Switching** throughout the application

### Responsive Design
- **Mobile-first Approach** with desktop optimization
- **Flexible Grid System** that adapts to all screen sizes
- **Touch-friendly Interface** with proper button sizing
- **Collapsible Navigation** for mobile devices
- **Horizontal Scrolling** for complex tables on mobile

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Auth.css         # Authentication styling
│   ├── Dashboard.css    # Dashboard-specific styles
│   ├── Projects.css     # Projects and layout styles
│   ├── ProjectForm.css  # Form styling
│   ├── EstimateForm.css # Estimate form styling
│   ├── Login.tsx        # Login component
│   ├── Register.tsx     # Registration component
│   ├── ForgotPassword.tsx # Password reset
│   ├── Dashboard.tsx    # Main dashboard
│   ├── Projects.tsx     # Projects listing
│   ├── Estimates.tsx    # Estimates listing
│   ├── AddProject.tsx   # Project creation form
│   ├── EditProject.tsx  # Project editing form
│   ├── AddEstimate.tsx  # Estimate creation form
│   ├── EditEstimate.tsx # Estimate editing form
│   ├── ProtectedRoute.tsx # Route protection
│   ├── PublicRoute.tsx  # Public route handling
│   └── Unauthorized.tsx # Access denied page
├── store/               # Redux store configuration
│   ├── index.ts         # Store setup
│   ├── hooks.ts         # Typed Redux hooks
│   └── slices/          # Redux slices
│       ├── authSlice.ts # Authentication state
│       ├── projectSlice.ts # Projects state
│       ├── estimateSlice.ts # Estimates state
│       └── uiSlice.ts   # UI state management
├── services/            # API services
│   └── mockApi.ts       # Mock API implementation
├── utils/               # Utility functions
│   ├── constants.ts     # Application constants
│   ├── helpers.ts       # Helper functions
│   └── validation.ts    # Form validation
├── i18n/                # Internationalization
│   ├── index.ts         # i18n configuration
│   └── locales/         # Translation files
│       ├── en.json      # English translations
│       ├── es.json      # Spanish translations
│       └── fr.json      # French translations
├── styles/              # Global styles
│   └── responsive.css   # Responsive utilities
├── App.tsx              # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v20.12.0 or higher)
- npm (v10.5.0 or higher)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd admin-panel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open your browser and navigate to `http://localhost:5174`
   - Use the login credentials below to access the system

## 🔐 Default Login Credentials

### Admin Account
- **Email**: `admin@example.com`
- **Password**: `password123`
- **Role**: Admin (full access)

### User Account
- **Email**: `user@example.com`
- **Password**: `password123`
- **Role**: User (limited access)

### Test Registration
You can also register a new account using any email and username combination.

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🔧 Mock API

The application uses a comprehensive mock API system that simulates real backend functionality:

### Features
- **Realistic API Delays** (500ms) to simulate network conditions
- **Data Persistence** during session (localStorage integration)
- **Error Handling** with proper HTTP status simulation
- **Pagination Support** with configurable page sizes
- **Filtering Capabilities** across multiple data fields
- **Search Functionality** with fuzzy matching
- **CRUD Operations** with proper validation

### API Endpoints (Simulated)

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/forgot-password` - Password reset

#### Projects
- `GET /projects` - List projects with filters and pagination
- `GET /projects/:id` - Get project by ID
- `POST /projects` - Create new project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

#### Estimates
- `GET /estimates` - List estimates with filters and pagination
- `GET /estimates/:id` - Get estimate by ID
- `POST /estimates` - Create new estimate
- `PUT /estimates/:id` - Update estimate
- `DELETE /estimates/:id` - Delete estimate

#### Dashboard
- `GET /dashboard/stats` - Get dashboard statistics

## 🏗️ Architecture & Design Choices

### State Management (Redux Toolkit)
- **Centralized State** for all application data
- **Async Thunks** for API operations
- **Immutable Updates** with Immer integration
- **Type Safety** with TypeScript integration
- **DevTools Support** for debugging

### Component Architecture
- **Functional Components** with React Hooks
- **Custom Hooks** for reusable logic
- **Compound Components** for complex UI patterns
- **Error Boundaries** for graceful error handling

### Styling Strategy
- **CSS Modules** for component-scoped styles
- **Responsive Design** with mobile-first approach
- **CSS Custom Properties** for theme consistency
- **Flexbox & Grid** for modern layouts

### Form Management
- **Controlled Components** for form inputs
- **Custom Validation** with real-time feedback
- **Error Handling** with user-friendly messages
- **Accessibility** with proper ARIA labels

### Performance Optimizations
- **Code Splitting** with lazy loading
- **Memoization** for expensive calculations
- **Virtual Scrolling** for large datasets
- **Image Optimization** with proper sizing

## 🌍 Internationalization

### Supported Languages
- **English** (en) - Default
- **Spanish** (es) - Complete translation
- **French** (fr) - Complete translation

### Adding New Languages

1. **Create translation file**
   ```bash
   src/i18n/locales/[language-code].json
   ```

2. **Update i18n configuration**
   ```typescript
   // src/i18n/index.ts
   import newLanguage from './locales/[language-code].json';
   
   const resources = {
     // ... existing languages
     [languageCode]: {
       translation: newLanguage,
     },
   };
   ```

3. **Use translations in components**
   ```typescript
   import { useTranslation } from 'react-i18next';
   
   const { t } = useTranslation();
   return <h1>{t('common.title')}</h1>;
   ```

## 🧪 Testing Strategy

### Unit Testing
- **Component Testing** with React Testing Library
- **Redux Testing** with mock store
- **Utility Testing** with Jest
- **API Testing** with mock implementations

### Integration Testing
- **User Flows** with end-to-end scenarios
- **Form Submissions** with validation testing
- **Navigation Testing** with protected routes
- **Authentication Flows** with state management

### Performance Testing
- **Bundle Size Analysis** with webpack-bundle-analyzer
- **Lighthouse Audits** for web vitals
- **Memory Leak Detection** with Chrome DevTools

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
```bash
# .env.production
VITE_API_URL=https://your-api-url.com
VITE_APP_NAME=Admin Panel
VITE_APP_VERSION=1.0.0
```

### Docker Deployment
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

## 🔮 Future Enhancements

### Planned Features
- **Real-time Notifications** with WebSocket integration
- **Advanced Analytics** with custom chart builders
- **PDF Export** for estimates and reports
- **File Upload** with drag-and-drop support
- **Advanced User Management** with role permissions
- **API Integration** with real backend services
- **PWA Support** with offline functionality
- **Dark Mode** theme switching
- **Advanced Filtering** with date pickers and multi-select
- **Keyboard Shortcuts** for power users

### Technical Improvements
- **Server-Side Rendering** with Next.js migration
- **GraphQL Integration** for efficient data fetching
- **Micro-frontends** architecture for scalability
- **Advanced Caching** with React Query
- **E2E Testing** with Playwright
- **CI/CD Pipeline** with automated deployment

## 🤝 Contributing

### Development Guidelines
1. **Follow TypeScript** strict mode requirements
2. **Write Tests** for new features and bug fixes
3. **Update Documentation** for any API changes
4. **Follow Naming Conventions** for consistency
5. **Use ESLint/Prettier** for code formatting

### Pull Request Process
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request with detailed description

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- **Documentation**: Check this README and inline code comments
- **Issues**: Open a GitHub issue with detailed reproduction steps
- **Email**: contact@adminpanel.com
- **Discord**: Join our community server

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Redux Toolkit** for simplified state management
- **i18next** for internationalization support
- **Recharts** for beautiful chart components
- **Vite** for lightning-fast development experience
- **TypeScript** for type safety and developer experience

---

**Built with ❤️ using React, TypeScript, Redux Toolkit, and modern web technologies.**
