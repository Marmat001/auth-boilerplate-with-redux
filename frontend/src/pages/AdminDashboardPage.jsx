import { useState, useEffect } from 'react'
import AdminNavigation from '../components/AdminNavigation'
import { useSelector } from 'react-redux'
import { getOrders } from '../helperFunctions/authFunction'
import DisplayPaymentInfo from '../components/DisplayPaymentInfo'
import { PDFDownloadLink } from '@react-pdf/renderer'
import InvoicePDF from '../components/InvoicePDF'
import { LoadingOutlined } from '@ant-design/icons'

const AdminDashboardPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const userInfo = useSelector((state) => state.user)

  useEffect(() => {
    importOrders()
    // eslint-disable-next-line
  }, [])

  const importOrders = () => {
    setLoading(true)
    getOrders(userInfo.token).then((resp) => {
      setLoading(false)
      setOrders(resp.data)
    })
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 text-center'>
          <AdminNavigation />
        </div>

        {loading ? (
          <div className='col text-center pt-3'>
            <LoadingOutlined className='loading-spinner' />
          </div>
        ) : (
          <div className='col text-center pt-3'>
            <h4 className='primary-heading'>
              {orders.length > 0 ? 'All Bookings' : 'No bookings to display'}
            </h4>

            {orders.map((order, i) => (
              <div key={i} className='m-5 p-3 card'>
                <DisplayPaymentInfo order={order} />
                <table className='table table-bordered'>
                  <thead className='thead-light'>
                    <tr>
                      <th scope='col'>Tour</th>
                      <th scope='col'>Destination</th>
                      <th scope='col'>Price</th>
                      <th scope='col'>Duration</th>
                      <th scope='col'>Difficulty</th>
                      <th scope='col'>Start Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <b className='text-info'>{order.tour.title}</b>
                      </td>

                      <td className='text-info'>{order.country}</td>
                      <td className='text-info'>
                        {(order.paymentIntent.amount /= 100).toLocaleString(
                          'en-US',
                          {
                            style: 'currency',
                            currency: 'USD',
                          }
                        )}
                      </td>
                      <td className='text-info'>
                        {order.tour.duration}{' '}
                        {order.tour.duration < 2 ? 'Day' : 'Days'}
                      </td>

                      <td className='text-info'>{order.tour.difficulty}</td>
                      <td className='text-info'>
                        {order.tour.startDate.substring(0, 10)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className='row'>
                  <div className='col'>
                    <p className='paymentinfo-heading pt-3'>
                      <PDFDownloadLink
                        document={<InvoicePDF order={order} />}
                        className='btn btn-block btn-outline-primary btn-sm'
                        fileName='Invoice.pdf'
                      >
                        Download PDF
                      </PDFDownloadLink>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboardPage
