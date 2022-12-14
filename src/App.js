import React from 'react';
import {Route, Routes} from 'react-router-dom'
import CarDetails from './pages/CarDetails'
import Landing from './pages/Landing'
import Info from './pages/Info'
import Login from './pages/Login'
import Cars from './pages/Cars'
import Dashboard from './pages/Dashboard'
import OutletComponent from './components/outlet/OutletComponent'
import { AuthContext } from "./context/auth.context";
import {useContext} from 'react';

const App = () => {
  const {isLoggedIn} = useContext(AuthContext);

  return (
    <div className='App'>

       <Routes>
          <Route element={<OutletComponent />}>
          <Route path="/" element={<Landing />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/:id" element={<CarDetails />} />
          <Route path="/info" element={<Info />} />
          <Route path="/admin/login" element={<Login />} />

          {!isLoggedIn &&
          <Route path="/admin/dashboard" element={<Landing />} />
          }

        { isLoggedIn &&
          <Route path="/admin/dashboard" element={<Dashboard />} />
        }



          </Route>
       </Routes>

    </div>
  )
}

export default App