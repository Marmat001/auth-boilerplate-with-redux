import { useState, useEffect } from 'react'
import UserNavigation from '../components/UserNavigation'
import {
  getWishlist,
  removeTourFromWishlist,
} from '../helperFunctions/authFunction'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'
import { Card } from 'antd'

const WishlistPage = () => {
  const [showNav, setShowNav] = useState(true)
  const [wishlist, setWishlist] = useState([])

  const userInfo = useSelector((state) => state.user)

  useEffect(() => {
    importWishlist()
  }, [])

  const importWishlist = () => {
    getWishlist(userInfo.token).then((resp) => {
      setWishlist(resp.data.wishlist)
    })
  }

  const handleDelete = (id) =>
    removeTourFromWishlist(id, userInfo.token).then((resp) => {
      importWishlist()
    })

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className={`${showNav && 'col-md-2 text-center'}`}>
          <UserNavigation showNav={showNav} setShowNav={setShowNav} />
        </div>
        <div className='col'>
          <h4 className='pt-3 text-center pb-5'>Wishlist</h4>

          {wishlist.map((t) => (
            <Card key={t._id}>
              <div className='d-flex justify-content-center'>
                <div className='alert alert-secondary w-100'>
                  <Link to={`/tour/${t.slug}`}>{t.title}</Link>
                  <span
                    onClick={() => handleDelete(t._id)}
                    className='float-right'
                  >
                    <DeleteOutlined className='btn btn-danger btn-raised' />
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WishlistPage
