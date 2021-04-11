import { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Navigation from './components/Navigation.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import RegisterFinalPage from './pages/RegisterFinalPage.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useDispatch } from 'react-redux'
import { authentication } from './firebase.js'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import { getUserInfo } from './helperFunctions/authFunction.js'
import UserDashboardPage from './pages/UserDashboardPage.jsx'
import AdminDashboardPage from './pages/AdminDashboardPage.jsx'
import UserRoute from './components/UserRoute.jsx'
import WishlistPage from './pages/WishlistPage.js'
import UpdateProfilePage from './pages/UpdateProfilePage.jsx'
import AdminRoute from './components/AdminRoute.jsx'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const stateChange = authentication.onAuthStateChanged(async (user) => {
      if (!user) return

      const token = await user.getIdTokenResult()

      getUserInfo(token.token)
        .then((resp) =>
          dispatch({
            type: 'AUTHENTICATED_USER',
            payload: {
              email: resp.data.email,
              name: resp.data.name,
              token: token.token,
              _id: resp.data._id,
              role: resp.data.role,
            },
          })
        )
        .catch((error) => console.log(error))
    })

    return () => stateChange()
  }, [dispatch])

  return (
    <>
      <ToastContainer />
      <Navigation />
      <Switch>
        <Route component={HomePage} path='/' exact />
        <UserRoute component={UserDashboardPage} path='/user/dashboard' exact />
        <UserRoute
          component={UpdateProfilePage}
          path='/user/update-profile'
          exact
        />
        <UserRoute component={WishlistPage} path='/user/wishlist' exact />
        <AdminRoute
          component={AdminDashboardPage}
          path='/admin/dashboard'
          exact
        />
        <Route component={LoginPage} path='/login' exact />
        <Route component={RegisterPage} path='/register' exact />
        <Route component={RegisterFinalPage} path='/register/complete' exact />
        <Route
          component={ForgotPasswordPage}
          path='/authentication/forgot-password'
          exact
        />
      </Switch>
    </>
  )
}

export default App
