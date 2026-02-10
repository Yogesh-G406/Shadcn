import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Plus, Search } from 'lucide-react'
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

export function UserManagement() {
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false)
  const [viewUserDialogOpen, setViewUserDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<string>('')

  const users = [
    {
      username: 'john.doe',
      email: 'john.doe@fmg.local',
      department: 'Finance',
      roles: 3,
      status: 'Active',
    },
    {
      username: 'alice.lee',
      email: 'alice.lee@fmg.local',
      department: 'HR',
      roles: 2,
      status: 'Active',
    },
    {
      username: 'bob.smith',
      email: 'bob.smith@fmg.local',
      department: 'IT',
      roles: 5,
      status: 'Active',
    },
    {
      username: 'carol.jones',
      email: 'carol.jones@fmg.local',
      department: 'Finance',
      roles: 1,
      status: 'Suspended',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground">Home &gt; Users</div>

      {/* All Users Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>All Users</CardTitle>
          <Badge variant="secondary">5,243</Badge>
        </CardHeader>
        <Separator />

        {/* Toolbar */}
        <div className="flex items-center gap-3 p-6 pb-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              className="pl-9"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="terminated">Terminated</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" onClick={() => setAddUserDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{user.roles}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === 'Active' ? 'success' : 'warning'
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedUser(user.username)
                        setViewUserDialogOpen(true)
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="justify-center">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </CardFooter>
      </Card>

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
              <Label htmlFor="new-username">Username *</Label>
              <Input id="new-username" placeholder="john.doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-email">Email *</Label>
              <Input id="new-email" type="email" placeholder="john.doe@fmg.local" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-department">Department *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select department..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                </SelectContent>
              </Select>
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

      {/* View User Dialog */}
      <Dialog open={viewUserDialogOpen} onOpenChange={setViewUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Viewing details for {selectedUser}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Username</Label>
              <Input value={selectedUser} disabled />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={`${selectedUser}@fmg.local`} disabled />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Input value="Finance" disabled />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Badge variant="success">Active</Badge>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewUserDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              // Handle edit user
              setViewUserDialogOpen(false)
            }}>
              Edit User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
