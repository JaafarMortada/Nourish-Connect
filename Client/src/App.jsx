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

function App() {

  const { store } = useStoreData();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/manager/*" element={store.token.length === 0 ? <Unauthorized /> : <ManagerRoutes />} />
        <Route path="/cashier/*" element={store.token.length === 0 ? <Unauthorized /> : <CashierRoutes />} />
        <Route path="/charity/*" element={store.token.length === 0 ? <Unauthorized /> : <CharityRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
