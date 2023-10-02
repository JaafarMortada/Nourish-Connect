import { Route, Routes } from 'react-router-dom';
import LoginPage from '../../pages/login/LoginPage';
import SignUpPage from '../../pages/signup/SignUpPage';


const AuthRoutes = () => {
    return ( 
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
        </Routes>
     );
}
 
export default AuthRoutes;