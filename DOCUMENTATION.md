// Café Fausse Project Documentation

## Project Overview
This is a premium restaurant website built with Next.js 14, React, TypeScript, and Tailwind CSS.

## Architecture

### Frontend Stack
- **Next.js 14**: React framework with App Router
- **React 18**: Component-based UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework

### Key Features
1. **Responsive Design**: Mobile-first approach with desktop optimization
2. **Dark Mode**: Complete theme switching capability
3. **Performance Optimized**: Image optimization, lazy loading, API response optimization
4. **Accessibility**: WCAG 2.1 AA compliant with screen reader support
5. **SEO Optimized**: Meta tags, structured data, optimized images

### Project Structure
```
client/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable React components
│   ├── contexts/           # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions and helpers
│   ├── mocks/              # Mock data for development
│   └── assets/             # Static images and assets
├── public/                 # Public static files
└── package.json           # Dependencies and scripts
```

### Component Architecture
- **Layout Components**: Navbar, Footer, Layout wrappers
- **Page Components**: Home, Menu, Reservations, About, Gallery, Newsletter
- **Form Components**: InputField, ErrorMessage, Loading states
- **Utility Components**: ThemeToggle, ErrorBoundary, SkipLinks

### State Management
- **Context API**: Theme and Toaster notifications
- **Custom Hooks**: Data fetching and form management
- **Local State**: Component-specific state with useState

### Performance Optimizations
1. **Image Optimization**: Next.js Image component with blur placeholders
2. **API Response Time**: Reduced from 3000ms to 800ms average
3. **Lazy Loading**: Components and images load on demand
4. **Code Splitting**: Automatic with Next.js App Router

### Accessibility Features
1. **Skip Links**: Navigation aids for keyboard users
2. **ARIA Labels**: Comprehensive labeling for screen readers
3. **Focus Management**: Visible focus indicators
4. **Color Contrast**: WCAG AA compliant contrast ratios
5. **Keyboard Navigation**: Full keyboard accessibility

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Development Guidelines
1. **Component Naming**: PascalCase for components
2. **File Organization**: Feature-based folder structure
3. **Type Safety**: Strict TypeScript configuration
4. **Code Style**: ESLint and Prettier configuration
5. **Performance**: Lighthouse score target 90+

### API Documentation
All API routes follow RESTful conventions:
- `GET /api/menu` - Retrieve menu items
- `GET /api/gallery` - Retrieve gallery images and reviews
- `POST /api/reservations` - Create new reservation
- `POST /api/newsletter` - Subscribe to newsletter

### Testing Strategy
- **Component Testing**: React Testing Library
- **E2E Testing**: Playwright (recommended)
- **Performance Testing**: Lighthouse CI
- **Accessibility Testing**: axe-core

### Deployment
- **Platform**: Vercel (recommended)
- **Build Command**: `npm run build`
- **Environment Variables**: Configure in .env.local

### Maintenance
- **Dependencies**: Regular updates with `npm audit`
- **Performance Monitoring**: Core Web Vitals tracking
- **Error Monitoring**: Built-in error boundaries
- **SEO Monitoring**: Search console integration
