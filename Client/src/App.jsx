import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStoreData } from './global/store';
import {
  AuthRoutes,
  CashierRoutes,
  CharityRoutes,
  ManagerRoutes,

} from './routes';
import { Unauthorized, LandingPage } from './Pages';
import { useState } from 'react';

function App() {

  const { store } = useStoreData();
  const authorized = localStorage.getItem("token")
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/manager/*" element={authorized ? <ManagerRoutes /> : <Unauthorized />} />
        <Route path="/cashier/*" element={authorized ? <CashierRoutes /> : <Unauthorized />} />
        <Route path="/charity/*" element={authorized ? <CharityRoutes /> : <Unauthorized />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
