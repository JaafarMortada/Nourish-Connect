import { Route, Routes } from 'react-router-dom';
import CharityDonations from '../../Pages/Charity/CharityDonations';
import Profile from '../../Pages/Profile';
import ChatsPage from '../../Pages/ChatsPage';

const CharityRoutes = () => {
    return ( 
        <Routes>
            <Route path="/donations" element={<CharityDonations />} />
            <Route path="/chats" element={<ChatsPage />} />
            <Route path="/profile" element={<Profile />} />

        </Routes>
     );
}
 
export default CharityRoutes;