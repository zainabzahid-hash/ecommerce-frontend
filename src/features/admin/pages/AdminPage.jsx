import AdminLayout from '../components/AdminLayout.jsx'
import CategoriesPage from './categories/CategoriesPage.jsx'
import ProductsPage from './products/ProductsPage.jsx'
import AttributePage from "./attributes/AttributesPage.jsx"

// path -> screen. Add one line here for every new admin screen
const screens = {
  '/admin': CategoriesPage,
  '/admin/products': ProductsPage,
  '/admin/attributes': AttributePage,
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