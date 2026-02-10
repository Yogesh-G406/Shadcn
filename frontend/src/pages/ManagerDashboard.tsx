import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  UserCheck,
  Search,
  Filter,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function ManagerDashboard() {
  const navigate = useNavigate()
  const [approveDialogOpen, setApproveDialogOpen] = useState(false)
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const pendingApprovals = [
    {
      id: 'REQ-001',
      requester: 'John Doe',
      role: 'ROLE_ADMIN',
      status: 'pending',
      requested: '02-08',
      justification: 'Need admin access to manage user accounts',
      department: 'IT',
      priority: 'high',
    },
    {
      id: 'REQ-002',
      requester: 'Alice Lee',
      role: 'ROLE_HR_VIEWER',
      status: 'pending',
      requested: '02-09',
      justification: 'Required for reviewing HR reports',
      department: 'HR',
      priority: 'medium',
    },
  ]

  const teamMembers = [
    {
      name: 'John Doe',
      roles: 3,
      department: 'Finance',
      status: 'Active',
      lastActive: '2 hours ago',
    },
    {
      name: 'Alice Lee',
      roles: 2,
      department: 'Finance',
      status: 'Active',
      lastActive: '1 day ago',
    },
    {
      name: 'Bob Smith',
      roles: 4,
      department: 'Finance',
      status: 'Active',
      lastActive: '3 hours ago',
    },
  ]

  const recentActions = [
    { action: 'Approved', requester: 'Sarah Wilson', role: 'ROLE_FINANCE_VIEWER', time: '1 hour ago', type: 'approved' },
    { action: 'Rejected', requester: 'Mike Johnson', role: 'ROLE_ADMIN', time: '3 hours ago', type: 'rejected' },
    { action: 'Approved', requester: 'Emily Davis', role: 'ROLE_HR_MANAGER', time: '1 day ago', type: 'approved' },
  ]

  const handleApprove = (request: any) => {
    setSelectedRequest(request)
    setApproveDialogOpen(true)
  }

  const handleReject = (request: any) => {
    setSelectedRequest(request)
    setRejectDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold">Manager Dashboard</h1>
        <p className="text-muted-foreground mt-1">Review access requests and manage your team</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Pending Approvals */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Approvals
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{pendingApprovals.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Require your action
            </p>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/users')}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Team Members
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All active
            </p>
          </CardContent>
        </Card>

        {/* This Month Approved */}
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/audit')}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Approved This Month
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              +20% from last month
            </p>
          </CardContent>
        </Card>

        {/* Average Response Time */}
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/reports')}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Response Time
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">2.5h</div>
            <p className="text-xs text-muted-foreground mt-1">
              Faster than average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Pending Approvals */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Approvals Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  <CardTitle>Pending Approvals</CardTitle>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                  {pendingApprovals.length} Pending
                </Badge>
              </div>
            </CardHeader>
            <Separator />

            {/* Search and Filter */}
            <div className="p-6 pb-0 space-y-4">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search requests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <CardContent className="pt-6">
              <div className="space-y-4">
                {pendingApprovals.map((request) => (
                  <div
                    key={request.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <UserCheck className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold">{request.requester}</p>
                          <p className="text-xs text-muted-foreground">
                            {request.department} · {request.id}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={request.priority === 'high' ? 'destructive' : 'default'}
                        className="text-xs"
                      >
                        {request.priority}
                      </Badge>
                    </div>

                    <div className="bg-muted/50 rounded p-3 mb-3">
                      <p className="text-sm font-medium mb-1">Requested Role:</p>
                      <Badge variant="outline">{request.role}</Badge>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs text-muted-foreground mb-1">Justification:</p>
                      <p className="text-sm">{request.justification}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <span className="text-xs text-muted-foreground">
                        Requested on {request.requested}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleReject(request)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(request)}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {pendingApprovals.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <CheckCircle2 className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p className="font-medium">All caught up!</p>
                    <p className="text-sm">No pending approvals at the moment</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Team Access Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <CardTitle>Team Access Overview</CardTitle>
                </div>
                <Badge variant="secondary">{teamMembers.length} Members</Badge>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="space-y-3">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => navigate('/users')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {member.department} · {member.roles} roles
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="success" className="mb-1">
                        {member.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        Active {member.lastActive}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate('/users')}
              >
                View All Team Members
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Recent Actions & Insights */}
        <div className="space-y-6">
          {/* Recent Actions */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <CardTitle className="text-base">Recent Actions</CardTitle>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="space-y-4">
                {recentActions.map((action, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0">
                      {action.type === 'approved' ? (
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                          <XCircle className="h-4 w-4 text-red-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">
                        {action.action} {action.requester}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {action.role}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {action.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">This Week Summary</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Requests Reviewed</span>
                <span className="text-lg font-bold">8</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Approval Rate</span>
                <span className="text-lg font-bold text-green-600">85%</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg. Time</span>
                <span className="text-lg font-bold text-blue-600">2.5h</span>
              </div>
            </CardContent>
          </Card>

          {/* Priority Alert */}
          <Card className="border-red-200 bg-red-50/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <CardTitle className="text-base text-red-900">
                  High Priority
                </CardTitle>
              </div>
            </CardHeader>
            <Separator className="bg-red-200" />
            <CardContent className="pt-4">
              <p className="text-sm mb-2">
                1 high-priority request requires immediate attention
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  const highPriorityRequest = pendingApprovals.find(req => req.priority === 'high')
                  if (highPriorityRequest) {
                    handleApprove(highPriorityRequest)
                  }
                }}
              >
                View Request
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Approve Dialog */}
      <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Access Request</DialogTitle>
            <DialogDescription>
              Approve {selectedRequest?.role} for {selectedRequest?.requester}?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-muted/50 rounded p-3">
              <p className="text-sm font-medium mb-1">Request Details:</p>
              <p className="text-sm text-muted-foreground">
                {selectedRequest?.justification}
              </p>
            </div>
            <div className="space-y-2">
              <Label>Comment (optional)</Label>
              <Textarea placeholder="Add approval comment..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                setApproveDialogOpen(false)
                alert('Request approved successfully!')
              }}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Access Request</DialogTitle>
            <DialogDescription>
              Reject {selectedRequest?.role} for {selectedRequest?.requester}?
            </DialogDescription>
          </DialogHeader>
          <Alert className="my-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This action will notify the requester. Please provide a reason.
            </AlertDescription>
          </Alert>
          <div className="space-y-2">
            <Label>Reason (required) *</Label>
            <Textarea
              placeholder="Provide rejection reason..."
              rows={4}
              required
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setRejectDialogOpen(false)
                alert('Request rejected')
              }}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
