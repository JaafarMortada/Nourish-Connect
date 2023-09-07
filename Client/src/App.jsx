import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreDataProvider } from './global/store';
import AuthRoutes from './routes/auth/AuthRoutes';



function App() {

  return (
    <BrowserRouter>
      <StoreDataProvider>
        <Routes>
          <Route path="/auth/*" element={<AuthRoutes />} />
        </Routes>
      </StoreDataProvider>
    </BrowserRouter>
  )
}

export default App
