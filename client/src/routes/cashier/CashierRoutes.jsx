import { Route, Routes } from 'react-router-dom';
import { 
    PointOfSales, 
    Inventory,

} from '../../pages/cashier';

const CashierRoutes = () => {
    return ( 
        <Routes>
            <Route path="/point-of-sales" element={<PointOfSales />} />
            <Route path="/inventory" element={<Inventory />} />

        </Routes>
     );
}
 
export default CashierRoutes;