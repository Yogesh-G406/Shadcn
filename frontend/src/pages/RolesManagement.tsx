import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import {
  Shield,
  Search,
  Plus,
  Edit,
  Trash2,
  Key,
  Users,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function RolesManagement() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [assignPermissionsOpen, setAssignPermissionsOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<any>(null)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const roles = [
    {
      id: 'ROLE_ADMIN',
      name: 'System Administrator',
      type: 'Functional',
      users: 3,
      permissions: 28,
      description: 'Full system access and control',
      status: 'active',
    },
    {
      id: 'ROLE_MANAGER',
      name: 'Manager',
      type: 'Organizational',
      users: 12,
      permissions: 15,
      description: 'Team and access request management',
      status: 'active',
    },
    {
      id: 'ROLE_HR_MANAGER',
      name: 'HR Manager',
      type: 'Functional',
      users: 5,
      permissions: 12,
      description: 'HR data and employee management',
      status: 'active',
    },
    {
      id: 'ROLE_FINANCE_MANAGER',
      name: 'Finance Manager',
      type: 'Functional',
      users: 8,
      permissions: 10,
      description: 'Financial data and approval access',
      status: 'active',
    },
    {
      id: 'ROLE_HR_VIEWER',
      name: 'HR Viewer',
      type: 'Functional',
      users: 20,
      permissions: 3,
      description: 'Read-only access to HR data',
      status: 'active',
    },
    {
      id: 'ROLE_USER',
      name: 'Standard User',
      type: 'Functional',
      users: 234,
      permissions: 5,
      description: 'Basic system access',
      status: 'active',
    },
  ]

  const allPermissions = {
    'User Management': [
      { id: 'USER_READ', name: 'View Users', selected: false },
      { id: 'USER_CREATE', name: 'Create Users', selected: false },
      { id: 'USER_UPDATE', name: 'Update Users', selected: false },
      { id: 'USER_DELETE', name: 'Delete Users', selected: false },
    ],
    'Role Management': [
      { id: 'ROLE_READ', name: 'View Roles', selected: false },
      { id: 'ROLE_CREATE', name: 'Create Roles', selected: false },
      { id: 'ROLE_UPDATE', name: 'Update Roles', selected: false },
      { id: 'ROLE_DELETE', name: 'Delete Roles', selected: false },
      { id: 'ROLE_ASSIGN', name: 'Assign Roles', selected: false },
    ],
    'Permission Management': [
      { id: 'PERMISSION_READ', name: 'View Permissions', selected: false },
      { id: 'PERMISSION_CREATE', name: 'Create Permissions', selected: false },
      { id: 'PERMISSION_UPDATE', name: 'Update Permissions', selected: false },
      { id: 'PERMISSION_DELETE', name: 'Delete Permissions', selected: false },
      { id: 'PERMISSION_ASSIGN', name: 'Assign Permissions', selected: false },
    ],
    'Access Requests': [
      { id: 'REQUEST_READ', name: 'View Requests', selected: false },
      { id: 'REQUEST_CREATE', name: 'Create Requests', selected: false },
      { id: 'REQUEST_APPROVE', name: 'Approve Requests', selected: false },
      { id: 'REQUEST_DELETE', name: 'Delete Requests', selected: false },
    ],
    'Audit & Compliance': [
      { id: 'AUDIT_READ', name: 'View Audit Logs', selected: false },
      { id: 'AUDIT_EXPORT', name: 'Export Audit Logs', selected: false },
      { id: 'REPORT_READ', name: 'View Reports', selected: false },
      { id: 'REPORT_GENERATE', name: 'Generate Reports', selected: false },
    ],
    'System Administration': [
      { id: 'SYSTEM_CONFIG', name: 'System Configuration', selected: false },
      { id: 'SYSTEM_BACKUP', name: 'System Backup', selected: false },
      { id: 'SYSTEM_RESTORE', name: 'System Restore', selected: false },
      { id: 'AD_SYNC', name: 'AD Synchronization', selected: false },
    ],
    'Finance': [
      { id: 'FINANCE_READ', name: 'View Financial Data', selected: false },
      { id: 'FINANCE_APPROVE', name: 'Approve Expenses', selected: false },
      { id: 'FINANCE_REPORT', name: 'Financial Reports', selected: false },
    ],
    'HR': [
      { id: 'HR_READ', name: 'View HR Data', selected: false },
      { id: 'HR_UPDATE', name: 'Update HR Data', selected: false },
      { id: 'HR_PAYROLL', name: 'Payroll Access', selected: false },
    ],
  }

  const handleAssignPermissions = (role: any) => {
    setSelectedRole(role)
    setSelectedPermissions([])
    setAssignPermissionsOpen(true)
  }

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    )
  }

  const toggleCategoryPermissions = (_category: string, permissions: any[]) => {
    const categoryPermissionIds = permissions.map(p => p.id)
    const allSelected = categoryPermissionIds.every(id =>
      selectedPermissions.includes(id)
    )

    if (allSelected) {
      setSelectedPermissions(prev =>
        prev.filter(id => !categoryPermissionIds.includes(id))
      )
    } else {
      setSelectedPermissions(prev => [
        ...new Set([...prev, ...categoryPermissionIds]),
      ])
    }
  }

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Roles Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage roles and assign permissions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/permissions')}>
            <Key className="h-4 w-4 mr-2" />
            View Permissions
          </Button>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Role
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Roles
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{roles.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active roles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Functional Roles
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {roles.filter(r => r.type === 'Functional').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on job function
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Organizational
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {roles.filter(r => r.type === 'Organizational').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on org structure
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {roles.reduce((sum, role) => sum + role.users, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              With role assignments
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
              <CardTitle>All Roles</CardTitle>
            </div>
            <Badge variant="secondary">{filteredRoles.length} Roles</Badge>
          </div>
        </CardHeader>
        <Separator />

        {/* Search */}
        <div className="p-6 pb-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search roles by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRoles.map((role) => (
              <div
                key={role.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{role.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {role.id}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{role.type}</Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {role.description}
                </p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-semibold">{role.users}</span> users
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-semibold">{role.permissions}</span> permissions
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleAssignPermissions(role)}
                  >
                    <Key className="h-3 w-3 mr-1" />
                    Manage Permissions
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Role Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
            <DialogDescription>
              Define a new role and assign permissions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role-id">Role ID *</Label>
                <Input
                  id="role-id"
                  placeholder="e.g., ROLE_MANAGER"
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-type">Role Type *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Functional">Functional</SelectItem>
                    <SelectItem value="Organizational">Organizational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-name">Display Name *</Label>
              <Input id="role-name" placeholder="e.g., Manager" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-desc">Description *</Label>
              <Textarea
                id="role-desc"
                placeholder="Describe the role's purpose..."
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
                setCreateDialogOpen(false)
                alert('Role created! You can now assign permissions.')
              }}
            >
              Create & Assign Permissions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Permissions Dialog */}
      <Dialog open={assignPermissionsOpen} onOpenChange={setAssignPermissionsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Assign Permissions to {selectedRole?.name}</DialogTitle>
            <DialogDescription>
              Select permissions to grant this role access. Selected: {selectedPermissions.length}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto py-4">
            <div className="space-y-6">
              {Object.entries(allPermissions).map(([category, permissions]) => {
                const categoryPermissionIds = permissions.map(p => p.id)
                const selectedCount = categoryPermissionIds.filter(id =>
                  selectedPermissions.includes(id)
                ).length
                const allSelected = selectedCount === permissions.length

                return (
                  <div key={category} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={allSelected}
                          onCheckedChange={() =>
                            toggleCategoryPermissions(category, permissions)
                          }
                        />
                        <div>
                          <h3 className="font-semibold">{category}</h3>
                          <p className="text-xs text-muted-foreground">
                            {selectedCount} of {permissions.length} selected
                          </p>
                        </div>
                      </div>
                      {selectedCount > 0 && (
                        <Badge variant="secondary">
                          {selectedCount}/{permissions.length}
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 ml-7">
                      {permissions.map((permission) => (
                        <div
                          key={permission.id}
                          className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 transition-colors"
                        >
                          <Checkbox
                            checked={selectedPermissions.includes(permission.id)}
                            onCheckedChange={() => togglePermission(permission.id)}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{permission.name}</p>
                            <p className="text-xs text-muted-foreground font-mono truncate">
                              {permission.id}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <DialogFooter className="border-t pt-4">
            <div className="flex items-center justify-between w-full">
              <div className="text-sm text-muted-foreground">
                {selectedPermissions.length} permissions selected
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setAssignPermissionsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    alert(`Assigned ${selectedPermissions.length} permissions to ${selectedRole?.name}`)
                    setAssignPermissionsOpen(false)
                  }}
                  disabled={selectedPermissions.length === 0}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Assign Permissions ({selectedPermissions.length})
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
