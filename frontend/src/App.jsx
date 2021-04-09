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

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const stateChange = authentication.onAuthStateChanged(async (user) => {
      if (!user) return

      const token = await user.getIdTokenResult()

      dispatch({
        type: 'AUTHENTICATED_USER',
        payload: {
          email: user.email,
          token: token.token,
        },
      })
    })
  }, [])

  return (
    <>
      <ToastContainer />
      <Navigation />
      <Switch>
        <Route component={HomePage} path='/' exact />
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
