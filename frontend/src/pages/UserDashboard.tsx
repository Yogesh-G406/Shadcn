import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Shield,
  Clock,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Plus,
  Calendar,
  Activity,
} from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function UserDashboard() {
  const navigate = useNavigate()

  const activeRoles = [
    {
      roleName: 'ROLE_USER',
      type: 'func',
      assigned: '2026-01-01',
      expires: '-',
    },
    {
      roleName: 'ROLE_FINANCE_MANAGER',
      type: 'org',
      assigned: '2026-01-15',
      expires: '2026-12-31',
    },
  ]

  const pendingRequests = [
    {
      role: 'ROLE_ADMIN',
      status: 'pending',
      requested: '2026-02-08',
    },
  ]

  const recentActivity = [
    { action: 'Role assigned', detail: 'ROLE_FINANCE_MANAGER', time: '2 days ago', type: 'success' },
    { action: 'Request submitted', detail: 'ROLE_ADMIN', time: '2 days ago', type: 'pending' },
    { action: 'Login', detail: 'From 192.168.1.100', time: '5 hours ago', type: 'info' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, John Doe</h1>
        <p className="text-muted-foreground mt-1">Here's your access overview and recent activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Active Roles Card */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Roles
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeRoles.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              2 permanent roles
            </p>
          </CardContent>
        </Card>

        {/* Pending Requests Card */}
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/requests')}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Requests
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{pendingRequests.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        {/* Expiring Soon Card */}
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/access-request')}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Expiring Soon
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">1</div>
            <p className="text-xs text-muted-foreground mt-1">
              Within 30 days
            </p>
          </CardContent>
        </Card>

        {/* Access Score Card */}
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/audit')}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Compliance Score
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">98%</div>
            <p className="text-xs text-muted-foreground mt-1">
              All policies met
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Roles and Requests */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Active Roles Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <CardTitle>My Active Roles</CardTitle>
                </div>
                <Badge variant="secondary">{activeRoles.length} Active</Badge>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="space-y-4">
                {activeRoles.map((role, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{role.roleName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {role.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Assigned {role.assigned}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Expires</p>
                      <p className="text-sm font-medium">
                        {role.expires === '-' ? 'Never' : role.expires}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Requests Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <CardTitle>Pending Requests</CardTitle>
                </div>
                <Button size="sm" onClick={() => navigate('/access-request')}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              {pendingRequests.length > 0 ? (
                <div className="space-y-4">
                  {pendingRequests.map((request, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg border-yellow-200 bg-yellow-50/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-semibold">{request.role}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Requested on {request.requested}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default" className="bg-yellow-600">
                          {request.status}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate('/requests')}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p>No pending requests</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Activity & Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate('/access-request')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Request Access
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate('/requests')}
                >
                  <Activity className="h-4 w-4 mr-2" />
                  View All Requests
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate('/audit')}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  My Activity Log
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                <CardTitle className="text-base">Recent Activity</CardTitle>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0">
                      {activity.type === 'success' && (
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                      )}
                      {activity.type === 'pending' && (
                        <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-yellow-600" />
                        </div>
                      )}
                      {activity.type === 'info' && (
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Activity className="h-4 w-4 text-blue-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {activity.detail}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expiring Roles Alert */}
          <Card className="border-orange-200 bg-orange-50/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <CardTitle className="text-base text-orange-900">
                  Expiring Soon
                </CardTitle>
              </div>
            </CardHeader>
            <Separator className="bg-orange-200" />
            <CardContent className="pt-4">
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold">ROLE_FINANCE_MANAGER</span> expires on{' '}
                  <span className="font-semibold">2026-12-31</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Consider requesting renewal if access is still needed
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => navigate('/access-request')}
                >
                  Request Renewal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
