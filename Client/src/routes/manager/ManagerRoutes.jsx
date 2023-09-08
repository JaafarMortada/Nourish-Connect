import { Route, Routes } from 'react-router-dom';
import { 
    Dashboard,

} from '../../Pages/Manager';

const ManagerRoutes = () => {
    return ( 
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
     );
}
 
export default ManagerRoutes;