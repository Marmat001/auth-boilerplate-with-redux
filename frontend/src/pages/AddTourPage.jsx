import { useState } from 'react'
import AdminNavigation from '../components/AdminNavigation'
import { useSelector } from 'react-redux'
import { addTour } from '../helperFunctions/tourFunctions'
import { toast } from 'react-toastify'

import AddTourForm from '../components/AddTourForm'

const initialState = {
  title: '',
  description: '',
  price: '',
  continent: '',
  country: '',
  images: [],
  startDate: '',
  maxPeople: '',
  duration: '',
  overview: '',
}

const AddTourPage = ({ history }) => {
  const [tourInfo, setTourInfo] = useState(initialState)
  const user = useSelector((state) => state.user)

  const handleSubmit = (e) => {
    e.preventDefault()
    addTour(tourInfo, user.token)
      .then((resp) => {
        toast.success(`"${resp.data.title} has been added!"`)
        history.push('/admin/tours')
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data.error)
      })
  }

  const handleChange = (name) => (e) => {
    setTourInfo({ ...tourInfo, [name]: e.target.value })
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 text-center pt-3 nav-border pb-3'>
          <AdminNavigation />
        </div>
        <div className='col mt-3'>
          <div className='text-center'>
            <h1 className='primary-heading'>Add Tour</h1>
          </div>

          <AddTourForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            tourInfo={tourInfo}
            setTourInfo={setTourInfo}
          />
        </div>
      </div>
    </div>
  )
}

export default AddTourPage
