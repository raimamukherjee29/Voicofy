import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import Home from './pages/Home/Home'
import Navigation from './components/shared/Navigation/Navigation'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Authenticate from './pages/authenticate/Authenticate'
import Activate from './pages/activate/Activate'
import Rooms from './pages/Rooms/Room'

const isAuth = false
const user = {
  activated: false,
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<GuestRoute Component={Home} />} />
        <Route
          path='/authenticate'
          element={<GuestRoute Component={Authenticate} />}
        />
        <Route
          path='/activate'
          element={<SemiProtected Component={Activate} />}
        />
        <Route path='/rooms' element={<Protected Component={Rooms} />} />
        {/* <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

const GuestRoute = ({ Component }) => {
  const navigate = useNavigate()
  if (isAuth) {
    return navigate('/rooms')
  } else {
    return <Component />
  }
}

const SemiProtected = ({ Component }) => {
  const navigate = useNavigate()
  if (!isAuth) {
    return navigate('/')
  } else {
    if (!user.activated) {
      return <Component />
    } else {
      return navigate('/rooms')
    }
  }
}

const Protected = ({ Component }) => {
  const navigate = useNavigate()
  if (!isAuth) {
    return navigate('/')
  } else {
    if (!user.activated) {
      return navigate('/activate')
    } else {
      return <Component />
    }
  }
}
export default App
