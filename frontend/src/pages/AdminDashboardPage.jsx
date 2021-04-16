import AdminNavigation from '../components/AdminNavigation'

const AdminDashboardPage = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 text-center'>
          <AdminNavigation />
        </div>

        <div className='col mt-3'>Admin Dashboard</div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
