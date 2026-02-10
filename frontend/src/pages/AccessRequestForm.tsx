import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'

export function AccessRequestForm() {
  const navigate = useNavigate()
  const [isTemporary, setIsTemporary] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    navigate('/requests')
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground">
        Home &gt; Request Access
      </div>

      {/* Form Card - Centered with max width */}
      <div className="flex justify-center">
        <Card className="w-full max-w-[640px]">
          <CardHeader>
            <CardTitle>Request New Access</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Request Type */}
              <div className="space-y-2">
                <Label htmlFor="request-type">
                  Request Type <span className="text-destructive">*</span>
                </Label>
                <Select defaultValue="role-based">
                  <SelectTrigger>
                    <SelectValue placeholder="Select request type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="role-based">Role-Based Access</SelectItem>
                    <SelectItem value="permission-based">Permission-Based Access</SelectItem>
                    <SelectItem value="emergency">Emergency Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Target User */}
              <div className="space-y-2">
                <Label htmlFor="target-user">
                  Target User <span className="text-destructive">*</span>
                </Label>
                <Select defaultValue="self">
                  <SelectTrigger>
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">John Doe (You)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">
                  Role <span className="text-destructive">*</span>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">ROLE_ADMIN</SelectItem>
                    <SelectItem value="hr-viewer">ROLE_HR_VIEWER</SelectItem>
                    <SelectItem value="finance-manager">ROLE_FINANCE_MANAGER</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Business Justification */}
              <div className="space-y-2">
                <Label htmlFor="justification">
                  Business Justification <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="justification"
                  required
                  rows={4}
                  placeholder="Enter business justification for this access request..."
                />
                <p className="text-sm text-muted-foreground">
                  Explain why you need this access.
                </p>
              </div>

              {/* Access Duration */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="temporary"
                    checked={isTemporary}
                    onCheckedChange={(checked) => setIsTemporary(checked as boolean)}
                  />
                  <Label htmlFor="temporary">
                    Temporary (set expiration date)
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Check if access should expire automatically.
                </p>
              </div>

              {/* Expires At */}
              <div className="space-y-2">
                <Label htmlFor="expires-at">Expires At</Label>
                <Input
                  id="expires-at"
                  type="date"
                  disabled={!isTemporary}
                  className={!isTemporary ? 'opacity-50 cursor-not-allowed' : ''}
                />
                <p className="text-sm text-muted-foreground">
                  Date when access will automatically expire.
                </p>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              Submit Request
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
