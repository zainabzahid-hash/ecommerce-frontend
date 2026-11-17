import AdminLayout from '../components/AdminLayout.jsx'
import CategoriesPage from './categories/CategoriesPage.jsx'

// /admin opens the layout with the categories screen inside
// (when you add more screens, choose which one to show here)
export default function AdminPage() {
  return (
    <AdminLayout>
      <CategoriesPage />
    </AdminLayout>
  )
}