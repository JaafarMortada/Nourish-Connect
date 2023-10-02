import { Route, Routes } from 'react-router-dom';
import CharityDonations from '../../pages/charity/CharityDonations';
import ChatsPage from '../../pages/ChatsPage';

const CharityRoutes = () => {
    return ( 
        <Routes>
            <Route path="/donations" element={<CharityDonations />} />
            <Route path="/chats" element={<ChatsPage />} />

        </Routes>
     );
}
 
export default CharityRoutes;