import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthRoutes from './routes/auth/AuthRoutes';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
