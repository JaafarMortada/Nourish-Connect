import { Route, Routes } from 'react-router-dom';
import LoginPage from '../../Pages/Login/LoginPage';
import SignUpPage from '../../Pages/Signup/SignUpPage';


const AuthRoutes = () => {
    return ( 
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
        </Routes>
     );
}
 
export default AuthRoutes;