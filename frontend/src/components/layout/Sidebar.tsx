import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Key,
  FileText,
  Users,
  Shield,
  Activity,
  BarChart,
  Settings,
} from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

const navigationItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Manager', path: '/manager' },
  { icon: Shield, label: 'Admin', path: '/admin' },
  { icon: FileText, label: 'Requests', path: '/requests' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: Shield, label: 'Roles', path: '/roles' },
  { icon: Key, label: 'Permissions', path: '/permissions' },
  { icon: Activity, label: 'Audit', path: '/audit' },
  { icon: BarChart, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

interface SidebarProps {
  onLinkClick?: () => void
}

export function Sidebar({ onLinkClick }: SidebarProps) {
  const location = useLocation()

  return (
    <aside className="w-60 h-full border-r bg-muted/40 p-4">
      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link key={item.path} to={item.path} onClick={onLinkClick}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-3',
                  isActive && 'bg-secondary'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
