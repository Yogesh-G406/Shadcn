# RBAC System Frontend

A modern Role-Based Access Control (RBAC) admin system built with React, TypeScript, Vite, and shadcn/ui.

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite 5
- **UI Components:** shadcn/ui (Zinc theme)
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **State Management:**
  - React Query (TanStack Query) for server state
  - Zustand for client state
- **Form Handling:** React Hook Form + Zod
- **HTTP Client:** Axios
- **Icons:** Lucide React

## Features

### Completed Screens

1. **User Dashboard** - View active roles and pending requests
2. **Manager Dashboard** - Approve/reject access requests, view team access
3. **Admin Dashboard** - System health, pending tasks, quick actions
4. **Access Request Form** - Self-service access request portal
5. **Request Status Tracking** - Track all access requests
6. **User Management** - Manage all users in the system
7. **Audit Log Viewer** - View detailed audit logs
8. **Reports Dashboard** - View orphaned accounts, dormant accounts, SoD violations
9. **System Settings** - Configure system parameters
10. **Notifications Panel** - View system notifications

## Getting Started

### Prerequisites

- Node.js 18+ or 20+ LTS
- npm 9+ or pnpm 8+

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

The build output will be in the `dist` folder.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx        # Main layout wrapper
│   │   │   ├── Header.tsx        # Global header
│   │   │   └── Sidebar.tsx       # Navigation sidebar
│   │   └── ui/                   # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── table.tsx
│   │       ├── badge.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       ├── textarea.tsx
│   │       ├── checkbox.tsx
│   │       ├── separator.tsx
│   │       ├── avatar.tsx
│   │       └── alert.tsx
│   ├── pages/                    # Screen components
│   │   ├── UserDashboard.tsx
│   │   ├── ManagerDashboard.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── AccessRequestForm.tsx
│   │   ├── RequestStatusTracking.tsx
│   │   ├── UserManagement.tsx
│   │   ├── AuditLogViewer.tsx
│   │   ├── ReportsDashboard.tsx
│   │   └── SystemSettings.tsx
│   ├── lib/
│   │   └── utils.ts              # Utility functions
│   ├── App.tsx                   # Main app with routing
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles + Tailwind
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Routing

- `/` → Redirects to `/dashboard`
- `/dashboard` → User Dashboard
- `/manager` → Manager Dashboard
- `/admin` → Admin Dashboard
- `/access-request` → Access Request Form
- `/requests` → Request Status Tracking
- `/users` → User Management
- `/audit` → Audit Log Viewer
- `/reports` → Reports Dashboard
- `/settings` → System Settings

## Design System

### Colors (Zinc Theme)

The application uses the shadcn/ui Zinc theme with the following color palette:

- **Background:** #FFFFFF (light) / #09090B (dark)
- **Foreground:** #09090B (light) / #FAFAFA (dark)
- **Primary:** #18181B
- **Secondary:** #F4F4F5
- **Muted:** #F4F4F5
- **Border:** #E4E4E7
- **Success:** #22C55E
- **Warning:** #EAB308
- **Destructive:** #EF4444

### Typography

- Font Family: Inter or system-ui
- Headings: Bold/Semibold
- Body: Regular 14px
- Labels: Medium 14px
- Captions: Regular 12px

### Spacing

Uses Tailwind's 8px-based spacing scale (4, 8, 12, 16, 24, 32, 48px)

## API Integration (Future)

The application is set up with:
- Axios for HTTP requests
- React Query for data fetching and caching
- Proxy configuration in `vite.config.ts` for `/api` routes to `http://localhost:8080`

To connect to the backend:

1. Update the proxy target in `vite.config.ts` if your backend runs on a different port
2. Create API service files in `src/services/`
3. Use React Query hooks for data fetching

Example:
```typescript
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useUserRoles() {
  return useQuery({
    queryKey: ['userRoles'],
    queryFn: () => axios.get('/api/v1/authz/user/me/roles').then(res => res.data)
  })
}
```

## State Management

### Server State (React Query)
Use for data fetching, caching, and synchronization with the backend.

### Client State (Zustand)
Use for global UI state like theme, user preferences, and UI flags.

## Contributing

1. Follow the existing code structure
2. Use TypeScript strict mode
3. Follow shadcn/ui component patterns
4. Use Tailwind CSS for styling
5. Ensure responsive design (desktop-first)

## License

Proprietary - FMG Organization

## Support

For issues or questions, please contact the development team.
