/*
Parallel Routes in Next.js allow us to render multiple route segments simultaneously within the same layout using named slots such as @analytics and @notifications. Each slot can have its own loading, error, and navigation behavior. They are commonly used for dashboards, split views, and modal-based interfaces.

structure:
- app/
  - dashboard/
    - layout.js
    - page.js
    - @analytics/
      - layout.js
      - page.js
      - loading.js
      - error.js
    - @notifications/
      - layout.js
      - page.js
      - loading.js
      - error.js

Why use Parallel Routes?
1. Improved User Experience: By rendering multiple segments simultaneously, users can interact with different parts of the application without waiting for one segment to load before another.
2. Modular Design: Each parallel route can have its own layout and behavior, making it easier to manage and maintain complex applications.
3. Enhanced Performance: Parallel routes can reduce the time users spend waiting for content to load, as multiple components can be fetched and rendered in parallel.
*/

// dashboard/layout.js
import AnalyticsLayout from "./@analytics/layout";
import NotificationsLayout from "./@notifications/layout";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <AnalyticsLayout />
      <NotificationsLayout />
      <main>{children}</main>
    </div>
  );
}

// dashboard/page.js
export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
}

// @analytics/layout.js
export default function AnalyticsLayout({ children }) {
  return (
    <div className="analytics-layout">
      <h2>Analytics</h2>
      {children}
    </div>
  );
}

// @analytics/page.js
export default function AnalyticsPage() {
  return (
    <div>
      <p>Analytics content goes here.</p>
    </div>
  );
}

// @analytics/loading.js
export default function AnalyticsLoading() {
  return <p>Loading analytics...</p>;
}

// @analytics/error.js
export default function AnalyticsError() {
  return <p>Error loading analytics.</p>;
}

// @notifications/layout.js
export default function NotificationsLayout({ children }) {
  return (
    <div className="notifications-layout">
      <h2>Notifications</h2>
      {children}
    </div>
  );
}

// @notifications/page.js
export default function NotificationsPage() {
  return (
    <div>
      <p>Notifications content goes here.</p>
    </div>
  );
}

// @notifications/loading.js
export default function NotificationsLoading() {
  return <p>Loading notifications...</p>;
}

// @notifications/error.js
export default function NotificationsError() {
  return <p>Error loading notifications.</p>;
}