import AdminLayout from '../components/AdminLayout.jsx'
import CategoriesPage from './categories/CategoriesPage.jsx'
import ProductsPage from './products/ProductsPage.jsx'

// path -> screen. Add one line here for every new admin screen
const screens = {
  '/admin': CategoriesPage,
  '/admin/products': ProductsPage,
}

export default function AdminPage() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  const Screen = screens[path] ?? CategoriesPage

  return (
    <AdminLayout>
      <Screen />
    </AdminLayout>
  )
}