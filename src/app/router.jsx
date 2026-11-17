import StorefrontPage from '../features/storefront/pages/StorefrontPage.jsx'
import AdminPage from '../features/admin/pages/AdminPage.jsx'

export function Router() {
  return window.location.pathname.startsWith('/admin')
    ? <AdminPage />
    : <StorefrontPage />
}
