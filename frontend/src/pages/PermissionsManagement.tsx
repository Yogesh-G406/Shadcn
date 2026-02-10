import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import {
  Shield,
  Search,
  Plus,
  Edit,
  Trash2,
  Key,
  Filter,
  CheckCircle2,
} from 'lucide-react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function PermissionsManagement() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedPermission, setSelectedPermission] = useState<any>(null)

  const permissions = [
    // User Management Permissions
    { id: 'USER_READ', name: 'View Users', category: 'User Management', description: 'View user information and details', status: 'active' },
    { id: 'USER_CREATE', name: 'Create Users', category: 'User Management', description: 'Create new user accounts', status: 'active' },
    { id: 'USER_UPDATE', name: 'Update Users', category: 'User Management', description: 'Modify existing user information', status: 'active' },
    { id: 'USER_DELETE', name: 'Delete Users', category: 'User Management', description: 'Remove user accounts from system', status: 'active' },

    // Role Management Permissions
    { id: 'ROLE_READ', name: 'View Roles', category: 'Role Management', description: 'View role information and assignments', status: 'active' },
    { id: 'ROLE_CREATE', name: 'Create Roles', category: 'Role Management', description: 'Create new roles in the system', status: 'active' },
    { id: 'ROLE_UPDATE', name: 'Update Roles', category: 'Role Management', description: 'Modify existing role definitions', status: 'active' },
    { id: 'ROLE_DELETE', name: 'Delete Roles', category: 'Role Management', description: 'Remove roles from the system', status: 'active' },
    { id: 'ROLE_ASSIGN', name: 'Assign Roles', category: 'Role Management', description: 'Assign roles to users', status: 'active' },

    // Permission Management
    { id: 'PERMISSION_READ', name: 'View Permissions', category: 'Permission Management', description: 'View permission definitions', status: 'active' },
    { id: 'PERMISSION_CREATE', name: 'Create Permissions', category: 'Permission Management', description: 'Create new permissions', status: 'active' },
    { id: 'PERMISSION_UPDATE', name: 'Update Permissions', category: 'Permission Management', description: 'Modify permission definitions', status: 'active' },
    { id: 'PERMISSION_DELETE', name: 'Delete Permissions', category: 'Permission Management', description: 'Remove permissions', status: 'active' },
    { id: 'PERMISSION_ASSIGN', name: 'Assign Permissions', category: 'Permission Management', description: 'Assign permissions to roles/users', status: 'active' },

    // Access Request Permissions
    { id: 'REQUEST_READ', name: 'View Requests', category: 'Access Requests', description: 'View access requests', status: 'active' },
    { id: 'REQUEST_CREATE', name: 'Create Requests', category: 'Access Requests', description: 'Submit access requests', status: 'active' },
    { id: 'REQUEST_APPROVE', name: 'Approve Requests', category: 'Access Requests', description: 'Approve or reject access requests', status: 'active' },
    { id: 'REQUEST_DELETE', name: 'Delete Requests', category: 'Access Requests', description: 'Remove access requests', status: 'active' },

    // Audit & Compliance
    { id: 'AUDIT_READ', name: 'View Audit Logs', category: 'Audit & Compliance', description: 'Access audit log information', status: 'active' },
    { id: 'AUDIT_EXPORT', name: 'Export Audit Logs', category: 'Audit & Compliance', description: 'Export audit logs for compliance', status: 'active' },
    { id: 'REPORT_READ', name: 'View Reports', category: 'Audit & Compliance', description: 'Access compliance reports', status: 'active' },
    { id: 'REPORT_GENERATE', name: 'Generate Reports', category: 'Audit & Compliance', description: 'Create compliance reports', status: 'active' },

    // System Administration
    { id: 'SYSTEM_CONFIG', name: 'System Configuration', category: 'System Administration', description: 'Modify system settings', status: 'active' },
    { id: 'SYSTEM_BACKUP', name: 'System Backup', category: 'System Administration', description: 'Perform system backups', status: 'active' },
    { id: 'SYSTEM_RESTORE', name: 'System Restore', category: 'System Administration', description: 'Restore system from backup', status: 'active' },
    { id: 'AD_SYNC', name: 'AD Synchronization', category: 'System Administration', description: 'Sync with Active Directory', status: 'active' },

    // Financial Permissions
    { id: 'FINANCE_READ', name: 'View Financial Data', category: 'Finance', description: 'Access financial information', status: 'active' },
    { id: 'FINANCE_APPROVE', name: 'Approve Expenses', category: 'Finance', description: 'Approve financial transactions', status: 'active' },
    { id: 'FINANCE_REPORT', name: 'Financial Reports', category: 'Finance', description: 'Generate financial reports', status: 'active' },

    // HR Permissions
    { id: 'HR_READ', name: 'View HR Data', category: 'HR', description: 'Access HR information', status: 'active' },
    { id: 'HR_UPDATE', name: 'Update HR Data', category: 'HR', description: 'Modify employee information', status: 'active' },
    { id: 'HR_PAYROLL', name: 'Payroll Access', category: 'HR', description: 'Access payroll information', status: 'active' },
  ]

  const categories = ['all', ...Array.from(new Set(permissions.map(p => p.category)))]

  const filteredPermissions = permissions.filter(permission => {
    const matchesSearch =
      permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permission.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || permission.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const permissionsByCategory = categories.reduce((acc, category) => {
    if (category === 'all') return acc
    acc[category] = filteredPermissions.filter(p => p.category === category)
    return acc
  }, {} as Record<string, typeof permissions>)

  const handleEdit = (permission: any) => {
    setSelectedPermission(permission)
    setEditDialogOpen(true)
  }

  const handleDelete = (permission: any) => {
    setSelectedPermission(permission)
    setDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Permissions Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage all system permissions and access controls
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Permission
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Permissions
            </CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{permissions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Categories
            </CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{categories.length - 1}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Permission groups
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {permissions.filter(p => p.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently enabled
            </p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate('/roles')}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Assigned to Roles
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">24</div>
            <p className="text-xs text-muted-foreground mt-1">
              View role assignments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>All Permissions</CardTitle>
            </div>
            <Badge variant="secondary">{filteredPermissions.length} Results</Badge>
          </div>
        </CardHeader>
        <Separator />

        {/* Filters */}
        <div className="p-6 pb-0 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search permissions by name, ID, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.filter(c => c !== 'all').map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <CardContent className="pt-6">
          {selectedCategory === 'all' ? (
            // Show grouped by category
            <div className="space-y-8">
              {Object.entries(permissionsByCategory).map(([category, perms]) => (
                perms.length > 0 && (
                  <div key={category}>
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-lg font-semibold">{category}</h3>
                      <Badge variant="secondary">{perms.length}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {perms.map((permission) => (
                        <div
                          key={permission.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Key className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-semibold">{permission.name}</p>
                                <p className="text-xs text-muted-foreground font-mono">
                                  {permission.id}
                                </p>
                              </div>
                            </div>
                            <Badge variant="success">{permission.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {permission.description}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(permission)}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDelete(permission)}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          ) : (
            // Show table view for specific category
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Permission ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPermissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell className="font-mono text-sm">
                      {permission.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {permission.name}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {permission.description}
                    </TableCell>
                    <TableCell>
                      <Badge variant="success">{permission.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(permission)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600"
                          onClick={() => handleDelete(permission)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {filteredPermissions.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Key className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p className="font-medium">No permissions found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Permission Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Permission</DialogTitle>
            <DialogDescription>
              Define a new permission for the system
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="perm-id">Permission ID *</Label>
              <Input
                id="perm-id"
                placeholder="e.g., USER_CREATE"
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Use UPPERCASE with underscores
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="perm-name">Display Name *</Label>
              <Input id="perm-name" placeholder="e.g., Create Users" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="perm-category">Category *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="User Management">User Management</SelectItem>
                  <SelectItem value="Role Management">Role Management</SelectItem>
                  <SelectItem value="Permission Management">Permission Management</SelectItem>
                  <SelectItem value="Access Requests">Access Requests</SelectItem>
                  <SelectItem value="Audit & Compliance">Audit & Compliance</SelectItem>
                  <SelectItem value="System Administration">System Administration</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="perm-desc">Description *</Label>
              <Textarea
                id="perm-desc"
                placeholder="Describe what this permission allows..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                alert('Permission created successfully!')
                setCreateDialogOpen(false)
              }}
            >
              Create Permission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Permission Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Permission</DialogTitle>
            <DialogDescription>
              Modify permission details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Permission ID</Label>
              <Input
                value={selectedPermission?.id}
                disabled
                className="font-mono bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-name">Display Name *</Label>
              <Input
                id="edit-name"
                defaultValue={selectedPermission?.name}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-desc">Description *</Label>
              <Textarea
                id="edit-desc"
                defaultValue={selectedPermission?.description}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                alert('Permission updated successfully!')
                setEditDialogOpen(false)
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Permission Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Permission</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this permission?
            </DialogDescription>
          </DialogHeader>
          <div className="bg-red-50 border border-red-200 rounded p-4 my-4">
            <p className="text-sm font-semibold mb-2">
              {selectedPermission?.name} ({selectedPermission?.id})
            </p>
            <p className="text-sm text-muted-foreground">
              This will remove the permission from all roles and users. This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                alert('Permission deleted successfully!')
                setDeleteDialogOpen(false)
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Permission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
