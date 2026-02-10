import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Shield, Lock, Clock, Bell, Server, Info } from 'lucide-react'

export function SystemSettings() {
  // Security Policies State
  const [requireMfa, setRequireMfa] = useState(false)
  const [enforceRbac, setEnforceRbac] = useState(false)
  const [requireManagerApproval, setRequireManagerApproval] = useState(false)
  const [enableRequestExpiry, setEnableRequestExpiry] = useState(false)

  // Password Policies State
  const [requireUppercase, setRequireUppercase] = useState(false)
  const [requireLowercase, setRequireLowercase] = useState(false)
  const [requireNumbers, setRequireNumbers] = useState(false)
  const [requireSpecialChars, setRequireSpecialChars] = useState(false)

  // Audit & Compliance State
  const [comprehensiveLogging, setComprehensiveLogging] = useState(false)
  const [logFailedAttempts, setLogFailedAttempts] = useState(false)
  const [generateReports, setGenerateReports] = useState(false)

  // Notification Settings State
  const [accessRequestNotifs, setAccessRequestNotifs] = useState(false)
  const [securityAlerts, setSecurityAlerts] = useState(false)
  const [adSyncAlerts, setAdSyncAlerts] = useState(false)
  const [weeklyDigest, setWeeklyDigest] = useState(false)

  // AD Integration State
  const [useSecureLdap, setUseSecureLdap] = useState(false)
  const [autoCreateUsers, setAutoCreateUsers] = useState(false)
  const [syncNestedGroups, setSyncNestedGroups] = useState(false)

  const handleSave = () => {
    alert('Settings saved successfully!')
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      alert('Settings reset to defaults')
    }
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">System Configuration</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage global security policies and system settings
        </p>
      </div>

      {/* Security Policies Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle>Security Policies</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Configure authentication and access control policies
          </p>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6 space-y-6">
          {/* Require MFA */}
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <Label className="font-medium">Require Multi-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Enforce MFA for all administrator accounts
              </p>
            </div>
            <Checkbox
              checked={requireMfa}
              onCheckedChange={(checked) => setRequireMfa(checked as boolean)}
              className="mt-1"
            />
          </div>

          {/* Enforce RBAC */}
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <Label className="font-medium">Enforce Role-Based Access Control</Label>
              <p className="text-sm text-muted-foreground">
                All access strictly through role assignments
              </p>
            </div>
            <Checkbox
              checked={enforceRbac}
              onCheckedChange={(checked) => setEnforceRbac(checked as boolean)}
              className="mt-1"
            />
          </div>

          {/* Require Manager Approval */}
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <Label className="font-medium">Require Manager Approval</Label>
              <p className="text-sm text-muted-foreground">
                All role requests require managerial approval
              </p>
            </div>
            <Checkbox
              checked={requireManagerApproval}
              onCheckedChange={(checked) => setRequireManagerApproval(checked as boolean)}
              className="mt-1"
            />
          </div>

          {/* Enable Access Request Expiry */}
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <Label className="font-medium">Enable Access Request Expiry</Label>
              <p className="text-sm text-muted-foreground">
                Auto-expire pending requests after specified period
              </p>
            </div>
            <Checkbox
              checked={enableRequestExpiry}
              onCheckedChange={(checked) => setEnableRequestExpiry(checked as boolean)}
              className="mt-1"
            />
          </div>

          {/* Session Timeout and Request Expiry */}
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input
                id="session-timeout"
                type="number"
                defaultValue="30"
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="request-expiry">Request Expiry (days)</Label>
              <Input
                id="request-expiry"
                type="number"
                defaultValue="7"
                className="bg-muted"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Policies Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            <CardTitle>Password Policies</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Configure password requirements and rotation policies
          </p>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6 space-y-6">
          {/* Password Fields Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="min-password-length">Minimum Password Length</Label>
              <Input
                id="min-password-length"
                type="number"
                defaultValue="14"
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-expiry-days">Password Expiry (days)</Label>
              <Input
                id="password-expiry-days"
                type="number"
                defaultValue="90"
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-history">Password History</Label>
              <Input
                id="password-history"
                type="number"
                defaultValue="12"
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">Cannot reuse last N passwords</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-failed-attempts">Max Failed Attempts</Label>
              <Input
                id="max-failed-attempts"
                type="number"
                defaultValue="5"
                className="bg-muted"
              />
            </div>
          </div>

          {/* Password Requirements Toggles */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <Label className="font-medium">Require Uppercase Letters</Label>
              <Checkbox
                checked={requireUppercase}
                onCheckedChange={(checked) => setRequireUppercase(checked as boolean)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="font-medium">Require Lowercase Letters</Label>
              <Checkbox
                checked={requireLowercase}
                onCheckedChange={(checked) => setRequireLowercase(checked as boolean)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="font-medium">Require Numbers</Label>
              <Checkbox
                checked={requireNumbers}
                onCheckedChange={(checked) => setRequireNumbers(checked as boolean)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="font-medium">Require Special Characters</Label>
              <Checkbox
                checked={requireSpecialChars}
                onCheckedChange={(checked) => setRequireSpecialChars(checked as boolean)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit & Compliance Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <CardTitle>Audit & Compliance</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Configure audit logging and compliance settings
          </p>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6 space-y-6">
          {/* Audit Toggles */}
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <Label className="font-medium">Enable Comprehensive Audit Logging</Label>
              <p className="text-sm text-muted-foreground">
                Log all user actions and system events
              </p>
            </div>
            <Checkbox
              checked={comprehensiveLogging}
              onCheckedChange={(checked) => setComprehensiveLogging(checked as boolean)}
              className="mt-1"
            />
          </div>

          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <Label className="font-medium">Log Failed Access Attempts</Label>
              <p className="text-sm text-muted-foreground">
                Record all unauthorized access attempts
              </p>
            </div>
            <Checkbox
              checked={logFailedAttempts}
              onCheckedChange={(checked) => setLogFailedAttempts(checked as boolean)}
              className="mt-1"
            />
          </div>

          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <Label className="font-medium">Generate Compliance Reports</Label>
              <p className="text-sm text-muted-foreground">
                Automatically generate monthly compliance reports
              </p>
            </div>
            <Checkbox
              checked={generateReports}
              onCheckedChange={(checked) => setGenerateReports(checked as boolean)}
              className="mt-1"
            />
          </div>

          {/* Log Retention and Archive Location */}
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="log-retention">Log Retention Period (days)</Label>
              <Input
                id="log-retention"
                type="number"
                defaultValue="365"
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="archive-location">Archive Location</Label>
              <Select defaultValue="aws-s3">
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aws-s3">AWS S3</SelectItem>
                  <SelectItem value="azure-blob">Azure Blob Storage</SelectItem>
                  <SelectItem value="local">Local Storage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Notification Settings</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Configure system notifications and alerts
          </p>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6 space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <Label className="font-medium">Access Request Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Notify approvers of new access requests
              </p>
            </div>
            <Checkbox
              checked={accessRequestNotifs}
              onCheckedChange={(checked) => setAccessRequestNotifs(checked as boolean)}
              className="mt-1"
            />
          </div>

          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <Label className="font-medium">Security Alert Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Alert on suspicious activities and security events
              </p>
            </div>
            <Checkbox
              checked={securityAlerts}
              onCheckedChange={(checked) => setSecurityAlerts(checked as boolean)}
              className="mt-1"
            />
          </div>

          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <Label className="font-medium">AD Sync Failure Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Notify administrators when AD sync fails
              </p>
            </div>
            <Checkbox
              checked={adSyncAlerts}
              onCheckedChange={(checked) => setAdSyncAlerts(checked as boolean)}
              className="mt-1"
            />
          </div>

          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <Label className="font-medium">Weekly Compliance Digest</Label>
              <p className="text-sm text-muted-foreground">
                Send weekly compliance summary to auditors
              </p>
            </div>
            <Checkbox
              checked={weeklyDigest}
              onCheckedChange={(checked) => setWeeklyDigest(checked as boolean)}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Active Directory Integration Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            <CardTitle>Active Directory Integration</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Configure AD connection and synchronization
          </p>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6 space-y-6">
          {/* AD Configuration Fields */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="domain-controller">Domain Controller</Label>
              <Input
                id="domain-controller"
                defaultValue="dc01.company.com"
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ldap-port">LDAP Port</Label>
              <Input
                id="ldap-port"
                type="number"
                defaultValue="389"
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="base-dn">Base DN</Label>
              <Input
                id="base-dn"
                defaultValue="DC=company,DC=com"
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sync-interval">Sync Interval (hours)</Label>
              <Input
                id="sync-interval"
                type="number"
                defaultValue="24"
                className="bg-muted"
              />
            </div>
          </div>

          {/* AD Toggles */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <Label className="font-medium">Use Secure LDAP (LDAPS)</Label>
              <Checkbox
                checked={useSecureLdap}
                onCheckedChange={(checked) => setUseSecureLdap(checked as boolean)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="font-medium">Auto-Create Users on Sync</Label>
              <Checkbox
                checked={autoCreateUsers}
                onCheckedChange={(checked) => setAutoCreateUsers(checked as boolean)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="font-medium">Sync Nested Groups</Label>
              <Checkbox
                checked={syncNestedGroups}
                onCheckedChange={(checked) => setSyncNestedGroups(checked as boolean)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Information Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            <CardTitle>System Information</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Current system version and status
          </p>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Application Version</Label>
              <p className="font-semibold">Enterprise RBAC v2.4.1</p>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Database Version</Label>
              <p className="font-semibold">PostgreSQL 15.2</p>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Last System Update</Label>
              <p className="font-semibold">February 1, 2026</p>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">License Status</Label>
              <p className="font-semibold text-green-600">Active - Enterprise</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pb-8">
        <Button variant="outline" onClick={handleReset}>
          Reset to Defaults
        </Button>
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  )
}
