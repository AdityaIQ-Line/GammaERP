import * as React from "react"
import { Suspense, lazy } from "react"
import { createBrowserRouter } from "react-router-dom"
import { RouteErrorBoundary } from "@/components/blocks/route-error-boundary"
import { AppDataLayout } from "@/components/layouts/app-data-layout"

/** Route-level lazy pages — smaller initial JS, fewer chunk warnings */
const DashboardPage = lazy(() =>
  import("@/pages/gaama/DashboardPage").then((m) => ({ default: m.DashboardPage })),
)
const CustomersPage = lazy(() =>
  import("@/pages/gaama/CustomersPage").then((m) => ({ default: m.CustomersPage })),
)
const CategoriesPage = lazy(() =>
  import("@/pages/gaama/CategoriesPage").then((m) => ({ default: m.CategoriesPage })),
)
const RatesPage = lazy(() =>
  import("@/pages/gaama/RatesPage").then((m) => ({ default: m.RatesPage })),
)
const SalesOrdersPage = lazy(() =>
  import("@/pages/gaama/SalesOrdersPage").then((m) => ({ default: m.SalesOrdersPage })),
)
const GRNPage = lazy(() => import("@/pages/gaama/GRNPage").then((m) => ({ default: m.GRNPage })))
const ProcessTrackingPage = lazy(() =>
  import("@/pages/gaama/ProcessTrackingPage").then((m) => ({ default: m.ProcessTrackingPage })),
)
const ChallanPage = lazy(() =>
  import("@/pages/gaama/ChallanPage").then((m) => ({ default: m.ChallanPage })),
)
const GatePassPage = lazy(() =>
  import("@/pages/gaama/GatePassPage").then((m) => ({ default: m.GatePassPage })),
)
const InvoicesPage = lazy(() =>
  import("@/pages/gaama/InvoicesPage").then((m) => ({ default: m.InvoicesPage })),
)
const CertificatesPage = lazy(() =>
  import("@/pages/gaama/CertificatesPage").then((m) => ({ default: m.CertificatesPage })),
)

const LandingPage = lazy(() =>
  import("@/pages/templates/LandingPage").then((m) => ({ default: m.LandingPage })),
)
const LoginPage = lazy(() =>
  import("@/pages/templates/LoginPage").then((m) => ({ default: m.LoginPage })),
)
const SignupPage = lazy(() =>
  import("@/pages/templates/SignupPage").then((m) => ({ default: m.SignupPage })),
)
const PasswordResetPage = lazy(() =>
  import("@/pages/templates/PasswordResetPage").then((m) => ({ default: m.PasswordResetPage })),
)
const NotFoundPage = lazy(() =>
  import("@/pages/templates/NotFoundPage").then((m) => ({ default: m.NotFoundPage })),
)

function PageLoadFallback() {
  return (
    <div className="flex min-h-[30vh] items-center justify-center bg-background text-sm text-muted-foreground">
      Loading…
    </div>
  )
}

function withSuspense(node: React.ReactElement) {
  return <Suspense fallback={<PageLoadFallback />}>{node}</Suspense>
}

/** Shared app routes – used for both main app (/) and sandbox (/sandbox) */
const appRoutes = [
  { index: true, element: <DashboardPage /> },
  { path: "customers", element: <CustomersPage /> },
  { path: "categories", element: <CategoriesPage /> },
  { path: "rates", element: <RatesPage /> },
  { path: "sales-orders", element: <SalesOrdersPage /> },
  { path: "grn", element: <GRNPage /> },
  { path: "process-tracking", element: <ProcessTrackingPage /> },
  { path: "challan", element: <ChallanPage /> },
  { path: "gate-pass", element: <GatePassPage /> },
  { path: "invoices", element: <InvoicesPage /> },
  { path: "certificates", element: <CertificatesPage /> },
]

/** Gaama ERP routes – Sidebar → Module Page → List → Create/Edit/View Modal */
export const router = createBrowserRouter([
  {
    path: "/welcome",
    element: withSuspense(<LandingPage />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/",
    element: withSuspense(<AppDataLayout />),
    errorElement: <RouteErrorBoundary />,
    children: appRoutes,
  },
  {
    path: "/sandbox",
    element: withSuspense(<AppDataLayout sandboxMode />),
    errorElement: <RouteErrorBoundary />,
    children: appRoutes,
  },
  {
    path: "/login",
    element: withSuspense(<LoginPage />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/signup",
    element: withSuspense(<SignupPage />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/password-reset",
    element: withSuspense(<PasswordResetPage />),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "*",
    element: withSuspense(<NotFoundPage homeButton={{ href: "/", label: "Go Home" }} />),
    errorElement: <RouteErrorBoundary />,
  },
])
