import { Route, Routes } from 'react-router-dom';
import CharityDonations from '../../Pages/Charity/CharityDonations';
import ChatsPage from '../../Pages/ChatsPage';

const CharityRoutes = () => {
    return ( 
        <Routes>
            <Route path="/donations" element={<CharityDonations />} />
            <Route path="/chats" element={<ChatsPage />} />

        </Routes>
     );
}
 
export default CharityRoutes;