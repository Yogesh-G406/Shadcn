import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { RefreshCw, Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function AdminDashboard() {
  const navigate = useNavigate()
  const [reviewTaskDialogOpen, setReviewTaskDialogOpen] = useState(false)
  const [createRoleDialogOpen, setCreateRoleDialogOpen] = useState(false)
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<string>('')

  const pendingTasks = [
    {
      taskType: 'Role Expiry',
      priority: 'High',
      created: '2026-02-10',
    },
    {
      taskType: 'SoD Violation',
      priority: 'Critical',
      created: '2026-02-09',
    },
    {
      taskType: 'AD Sync Failed',
      priority: 'Medium',
      created: '2026-02-10',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground">Home</div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-6">
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/settings')}
        >
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-3">
            <Badge variant="success" className="text-base px-4 py-1">
              ● Healthy
            </Badge>
            <div className="w-full max-w-[200px] h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{ width: '99.8%' }}
              />
            </div>
            <p className="text-sm text-muted-foreground">99.8% Uptime</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/users')}
        >
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <p className="text-4xl font-bold">5,243</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <p className="text-4xl font-bold">15</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Admin Tasks Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Pending Admin Tasks</CardTitle>
          <Badge variant="secondary">{pendingTasks.length}</Badge>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingTasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>{task.taskType}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        task.priority === 'Critical'
                          ? 'destructive'
                          : task.priority === 'High'
                          ? 'warning'
                          : 'default'
                      }
                    >
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.created}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedTask(task.taskType)
                        setReviewTaskDialogOpen(true)
                      }}
                    >
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Button onClick={() => setCreateRoleDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Role
            </Button>
            <Button onClick={() => setAddUserDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
            <Button
              variant="outline"
              onClick={() => alert('AD Sync initiated...')}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync AD Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Review Task Dialog */}
      <Dialog open={reviewTaskDialogOpen} onOpenChange={setReviewTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Task</DialogTitle>
            <DialogDescription>
              Task: {selectedTask}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Task Details</Label>
              <Textarea
                value={`Task Type: ${selectedTask}\nStatus: Pending Review\nDescription: This task requires admin attention.`}
                disabled
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>Resolution Notes</Label>
              <Textarea placeholder="Add resolution notes..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewTaskDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              // Handle task resolution
              setReviewTaskDialogOpen(false)
            }}>
              Mark Resolved
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Role Dialog */}
      <Dialog open={createRoleDialogOpen} onOpenChange={setCreateRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
            <DialogDescription>
              Define a new role in the system.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="role-name">Role Name *</Label>
              <Input id="role-name" placeholder="ROLE_NAME" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-description">Description *</Label>
              <Textarea id="role-description" placeholder="Role description..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              // Handle role creation
              setCreateRoleDialogOpen(false)
            }}>
              Create Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account in the system.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="admin-new-username">Username *</Label>
              <Input id="admin-new-username" placeholder="john.doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-new-email">Email *</Label>
              <Input id="admin-new-email" type="email" placeholder="john.doe@fmg.local" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              // Handle user creation
              setAddUserDialogOpen(false)
            }}>
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
