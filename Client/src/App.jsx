import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreDataProvider } from './global/store';
import {
  AuthRoutes,
  CashierRoutes,
  CharityRoutes,
  ManagerRoutes,

} from './routes';


function App() {

  return (
    <BrowserRouter>
      <StoreDataProvider>
        <Routes>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/manager/*" element={<ManagerRoutes />} />
          <Route path="/cashier/*" element={<CashierRoutes />} />
          <Route path="/charity/*" element={<CharityRoutes />} />
        </Routes>
      </StoreDataProvider>
    </BrowserRouter>
  )
}

export default App
