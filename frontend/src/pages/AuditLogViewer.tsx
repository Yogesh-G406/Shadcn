import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Download } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function AuditLogViewer() {
  const [activeFilter, setActiveFilter] = useState<string>('today')

  const handleExport = () => {
    alert('Exporting audit logs to CSV...')
  }

  const logs = [
    {
      timestamp: '2026-02-10 10:30:15',
      user: 'john.doe',
      eventType: 'Authentication',
      action: 'login',
      result: 'success',
      ipAddress: '192.168.1.100',
    },
    {
      timestamp: '2026-02-10 10:35:22',
      user: 'john.doe',
      eventType: 'Authorization',
      action: 'read_finance_report',
      result: 'success',
      ipAddress: '192.168.1.100',
    },
    {
      timestamp: '2026-02-10 11:15:03',
      user: 'alice.lee',
      eventType: 'Authorization',
      action: 'approve_expense',
      result: 'success',
      ipAddress: '192.168.1.105',
    },
    {
      timestamp: '2026-02-10 12:05:41',
      user: 'bob.smith',
      eventType: 'Authorization',
      action: 'read_confidential_data',
      result: 'denied',
      ipAddress: '192.168.1.110',
    },
    {
      timestamp: '2026-02-10 14:20:18',
      user: 'admin.user',
      eventType: 'Role Change',
      action: 'role_assigned',
      result: 'success',
      ipAddress: '192.168.1.50',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground">Home &gt; Audit Logs</div>

      {/* Audit Logs Card */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Logs</CardTitle>
        </CardHeader>
        <Separator />

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap gap-2 p-6 pb-0">
          <Button
            variant={activeFilter === 'today' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('today')}
          >
            Today
          </Button>
          <Button
            variant={activeFilter === 'last7' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('last7')}
          >
            Last 7 Days
          </Button>
          <Button
            variant={activeFilter === 'last30' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('last30')}
          >
            Last 30 Days
          </Button>
          <Button
            variant={activeFilter === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('month')}
          >
            This Month
          </Button>
          <Button
            variant={activeFilter === 'custom' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('custom')}
          >
            Custom Range
          </Button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 p-6 pb-0">
          <div className="flex items-center gap-2">
            <Label>From:</Label>
            <Input type="date" className="w-auto" />
          </div>
          <div className="flex items-center gap-2">
            <Label>To:</Label>
            <Input type="date" className="w-auto" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="authentication">Authentication</SelectItem>
              <SelectItem value="authorization">Authorization</SelectItem>
              <SelectItem value="role-change">Role Change</SelectItem>
              <SelectItem value="permission-change">Permission Change</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-users">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-users">All Users</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Event Type</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.eventType}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        log.result === 'success' ? 'success' : 'destructive'
                      }
                    >
                      {log.result}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.ipAddress}</TableCell>
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
