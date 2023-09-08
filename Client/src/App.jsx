import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreDataProvider } from './global/store';
import {
  AuthRoutes,
  ManagerRoutes,

} from './routes';


function App() {

  return (
    <BrowserRouter>
      <StoreDataProvider>
        <Routes>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/Manager/*" element={<ManagerRoutes />} />
        </Routes>
      </StoreDataProvider>
    </BrowserRouter>
  )
}

export default App
