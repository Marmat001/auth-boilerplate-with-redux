import { Switch, Route } from 'react-router-dom'
import Navigation from './components/Navigation.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

const App = () => {
  return (
    <>
      <Navigation />
      <Switch>
        <Route component={HomePage} path='/' exact />
        <Route component={LoginPage} path='/login' exact />
        <Route component={RegisterPage} path='/register' exact />
      </Switch>
    </>
  )
}

export default App
