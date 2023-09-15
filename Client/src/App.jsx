import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStoreData } from './global/store';
import {
  AuthRoutes,
  CashierRoutes,
  CharityRoutes,
  ManagerRoutes,

} from './routes';
import Unauthorized from './Pages/Unauthorized';
import { useState } from 'react';

function App() {

  const { store } = useStoreData();
  const [ authorized, setAuthorized ] = useState(localStorage.getItem("token") && store.token !== '')
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/manager/*" element={authorized ? <ManagerRoutes /> : <Unauthorized />} />
        <Route path="/cashier/*" element={authorized ? <CashierRoutes /> : <Unauthorized />} />
        <Route path="/charity/*" element={authorized ? <CharityRoutes /> : <Unauthorized />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
