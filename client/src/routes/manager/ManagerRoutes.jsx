import { Route, Routes } from 'react-router-dom';
import { 
    Dashboard,
    CashiersList,
    Donations,
    Discounts,

} from '../../Pages/Manager';
import ChatsPage from '../../pages/ChatsPage';
import CharitiesMap from '../../pages/manager/CharitiesMap';

const ManagerRoutes = () => {
    return ( 
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cashiers" element={<CashiersList />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/discounts" element={<Discounts />} />
            <Route path="/chats" element={<ChatsPage />} />
            <Route path="/map" element={<CharitiesMap />} />

        </Routes>
     );
}
 
export default ManagerRoutes;