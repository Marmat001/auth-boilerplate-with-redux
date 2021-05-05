import { useState, useEffect } from 'react'
import AdminNavigation from '../components/AdminNavigation'
import { useSelector } from 'react-redux'
import {
  addCoupon,
  getCoupons,
  removeCoupon,
} from '../helperFunctions/couponFunctions'
import { toast } from 'react-toastify'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, DatePicker } from 'antd'
import moment from 'moment'

const AddCouponPage = () => {
  const user = useSelector((state) => state.user)

  const [name, setName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [buttonText, setButtonText] = useState('Save')
  const [discount, setDiscount] = useState('')
  const [coupons, setCoupons] = useState([])

  useEffect(() => {
    importCoupons()
  }, [])

  const importCoupons = () => getCoupons().then((c) => setCoupons(c.data))

  const handleSubmit = (e) => {
    e.preventDefault()
    setButtonText('Submitting')

    addCoupon({ name, expiry, discount }, user.token)
      .then((resp) => {
        setName('')
        setDiscount('')
        setExpiry('')
        setButtonText('Submit')
        importCoupons()
        toast.success(`"${resp.data.name}" has been created!`)
      })
      .catch((error) => {
        setButtonText('Submit')
        if (error.response.status === 400) toast.error(error.response.data)
      })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      removeCoupon(id, user.token)
        .then((resp) => {
          importCoupons()
          toast.error(`Coupon "${resp.data.name}" has been deleted`)
        })
        .catch((error) => console.log(error))
    }
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 text-center'>
          <AdminNavigation />
        </div>
        <div className='col mt-3'>
          <div className='text-center'>
            <h1 className='primary-heading'>Add Coupon</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                type='text'
                className='form-control input-background p-3'
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
                placeholder='Coupon name (6 characters minimum)'
              />
              <label>Coupon name</label>
              <br />
            </div>

            <div className='form-group'>
              <input
                type='number'
                className='form-control input-background p-3 mb-3'
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
                placeholder='Discount % amount'
              />
              <label>Discount % amount</label>
              <br />
            </div>

            <div className='form-group'>
              <DatePicker
                style={{ color: 'black' }}
                placeholder='Set expiry date'
                className='form-control input-background p-3 mt-5'
                onChange={(date, dateString) => setExpiry(dateString)}
                disabledDate={(currentDate) =>
                  currentDate &&
                  currentDate.valueOf() < moment().subtract(1, 'days')
                }
              />
            </div>

            <Button
              onClick={handleSubmit}
              className='btn btn-primary btn-raised mr-3 mb-3'
              disabled={
                name.length < 6 ||
                !expiry ||
                !discount ||
                buttonText === 'Submitting'
              }
            >
              {buttonText}
            </Button>
          </form>

          <br />
          <br />

          <h4>Existing Coupons</h4>
          <table className='table table-bordered mt-4'>
            <thead className='thead-light'>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Expiry</th>
                <th scope='col'>Discount</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>{c.discount}%</td>
                  <td>
                    <DeleteOutlined
                      className='btn btn-danger btn-raised'
                      onClick={() => handleDelete(c._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AddCouponPage
