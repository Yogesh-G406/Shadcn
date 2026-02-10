import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function RequestStatusTracking() {
  const navigate = useNavigate()

  const requests = [
    {
      requestId: 'REQ-001',
      role: 'ROLE_ADMIN',
      status: 'pending',
      requested: '02-08',
      expires: '-',
    },
    {
      requestId: 'REQ-002',
      role: 'ROLE_HR_VIEWER',
      status: 'approved',
      requested: '02-05',
      expires: '03-31',
    },
    {
      requestId: 'REQ-003',
      role: 'ROLE_FINANCE_MANAGER',
      status: 'rejected',
      requested: '02-01',
      expires: '-',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground">
        Home &gt; My Requests
      </div>

      {/* My Access Requests Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>My Access Requests</CardTitle>
          <Badge variant="secondary">{requests.length}</Badge>
        </CardHeader>
        <Separator />

        {/* Toolbar */}
        <div className="flex items-center justify-between p-6 pb-0">
          <div className="flex items-center gap-2">
            <Label>Status:</Label>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="provisioned">Provisioned</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button size="sm" onClick={() => navigate('/access-request')}>
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </div>

        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested</TableHead>
                <TableHead>Expires</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.requestId}>
                  <TableCell>{request.requestId}</TableCell>
                  <TableCell>{request.role}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === 'approved'
                          ? 'success'
                          : request.status === 'rejected'
                          ? 'destructive'
                          : 'default'
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.requested}</TableCell>
                  <TableCell>{request.expires}</TableCell>
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
    </div>
  )
}
