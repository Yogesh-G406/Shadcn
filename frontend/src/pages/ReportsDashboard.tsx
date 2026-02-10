import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function ReportsDashboard() {
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<{ title: string; count: string; description: string } | null>(null)

  const reports = [
    {
      title: 'Orphaned Accounts',
      count: '23',
      description: 'Users with no active roles',
      variant: 'warning' as const,
    },
    {
      title: 'Dormant Accounts',
      count: '45',
      description: 'No activity in 90+ days',
      variant: 'default' as const,
    },
    {
      title: 'Privileged Users',
      count: '8',
      description: 'Users with admin roles',
      variant: 'default' as const,
    },
    {
      title: 'SoD Violations',
      count: '3',
      description: 'Conflicting role assignments',
      variant: 'destructive' as const,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground">Home &gt; Reports</div>

      {/* Reports Grid */}
      <div className="grid grid-cols-2 gap-6">
        {reports.map((report, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-base">{report.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <p
                className={`text-5xl font-bold ${
                  report.variant === 'warning'
                    ? 'text-yellow-600'
                    : report.variant === 'destructive'
                    ? 'text-red-600'
                    : 'text-foreground'
                }`}
              >
                {report.count}
              </p>
              <p className="text-sm text-muted-foreground text-center">
                {report.description}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedReport(report)
                  setReportDialogOpen(true)
                }}
              >
                View Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Details Dialog */}
      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedReport?.title}</DialogTitle>
            <DialogDescription>
              {selectedReport?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-4xl font-bold mb-4">
              {selectedReport?.count} accounts
            </p>
            <p className="text-sm text-muted-foreground text-center">
              This is a detailed view of the {selectedReport?.title.toLowerCase()} report.
              In a production system, this would show a detailed table with all affected accounts.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReportDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              // Handle export
              alert('Exporting report...')
              setReportDialogOpen(false)
            }}>
              Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
