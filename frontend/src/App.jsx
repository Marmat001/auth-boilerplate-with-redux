import { Switch, Route } from 'react-router-dom'
import Navigation from './components/Navigation.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import RegisterFinalPage from './pages/RegisterFinalPage.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <Switch>
        <Route component={HomePage} path='/' exact />
        <Route component={LoginPage} path='/login' exact />
        <Route component={RegisterPage} path='/register' exact />
        <Route component={RegisterFinalPage} path='/register/complete' exact />
      </Switch>
    </>
  )
}

export default App
