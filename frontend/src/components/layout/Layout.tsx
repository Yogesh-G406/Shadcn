import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { useState } from 'react'

export function Layout() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onNotificationsToggle={() => setNotificationsOpen(!notificationsOpen)}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex flex-1 relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:relative inset-y-0 left-0 z-40 lg:z-0
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <Sidebar onLinkClick={() => setSidebarOpen(false)} />
        </div>

        <main className="flex-1 p-8 bg-background">
          <Outlet />
        </main>
      </div>

      {/* Notifications Panel Overlay */}
      {notificationsOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setNotificationsOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[400px] bg-background border-l shadow-lg">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Notifications</h2>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Mark All Read
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {/* Notification items will go here */}
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <p className="text-lg font-semibold mb-2">No notifications</p>
                    <p className="text-sm">You're all caught up!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
