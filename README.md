# RBAC System with Shadcn/UI

A Role-Based Access Control (RBAC) system built with React, TypeScript, Vite, and 100% authentic shadcn/ui components.

## 🚀 Features

- **User Dashboard** - View assigned roles, pending requests, and recent activity
- **Manager Dashboard** - Approve/reject access requests and manage team
- **Admin Dashboard** - Complete system administration and oversight
- **Permissions Management** - View and manage 30+ permissions across 8 categories
- **Roles Management** - Create roles and assign permissions
- **User Management** - Manage users and their role assignments
- **Access Request System** - Request and track role-based access
- **Audit Log Viewer** - View all system events and authentication logs
- **Reports Dashboard** - Generate compliance and activity reports
- **System Settings** - Configure security policies, password policies, AD integration

## 🎨 Tech Stack

- **Framework:** React 18.2 with TypeScript 5.3
- **Build Tool:** Vite 5.0
- **UI Components:** shadcn/ui (100% authentic components)
- **Styling:** Tailwind CSS 3.4
- **Icons:** Lucide React
- **Routing:** React Router v6.21
- **Radix UI Primitives:**
  - @radix-ui/react-avatar
  - @radix-ui/react-checkbox
  - @radix-ui/react-dialog
  - @radix-ui/react-label
  - @radix-ui/react-select
  - @radix-ui/react-separator

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Yogesh-G406/Shadcn.git
cd Shadcn
```

2. Install dependencies:
```bash
cd frontend
npm install
```

3. Run development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build

Build for production:
```bash
cd frontend
npm run build
```

The build output will be in `frontend/dist/`

## 🌐 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from frontend directory
cd frontend
vercel

# For production deployment
vercel --prod
```

## 📁 Project Structure

```
RBAC/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   └── layout/      # Layout components
│   │   ├── pages/           # Page components
│   │   ├── lib/             # Utilities
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── vercel.json              # Vercel configuration
└── README.md
```

## 🎯 UI Components (100% shadcn/ui)

All components follow the official shadcn/ui specification:

### Radix UI Components (6)
- ✅ Avatar
- ✅ Checkbox
- ✅ Dialog
- ✅ Label
- ✅ Select
- ✅ Separator

### CVA Components (3)
- ✅ Alert
- ✅ Badge
- ✅ Button

### Styled HTML (4)
- ✅ Card
- ✅ Input
- ✅ Table
- ✅ Textarea

## 🔧 Configuration Files

- `vercel.json` - Vercel deployment configuration with SPA routing
- `frontend/vercel.json` - Frontend-specific Vercel configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript configuration

## 🐛 Troubleshooting

### 404 Error on Vercel
The project includes `vercel.json` files that handle client-side routing. If you still get 404 errors:

1. Make sure you're deploying from the root directory
2. Verify the `vercel.json` file exists in both root and frontend directories
3. Check that the output directory is set to `frontend/dist`

### Build Errors
If you encounter build errors:

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf .vite
```

## 📄 License

This project is for educational and demonstration purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or issues, please open an issue on GitHub.

---

Built with ❤️ using 100% authentic shadcn/ui components
