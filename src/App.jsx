import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Documents from './components/documents/sales/Sales';
import Expenses from './components/documents/expenses/Expenses';
import Counterparties from './components/counterparties/Counterparties';
import Warehouse from './components/warehouse/Warehouse';
import Catalog from './components/catalog/Catalog';
import Employees from './components/employees/Employees';
import GpsSystem from './components/gpsSystem/GpsSystem';
import AddInvoice from './components/documents/add-invoice/AddInvoice';
import AddIncomingInvoice from './components/documents/sales/add-incoming-invoice/AddIncomingInvoice';
function App() {
    return (
        <div className="container">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='/documents/sales' element={<Documents />} />
                    <Route path='/documents/expenses' element={<Expenses />} />
                    <Route path='/add-invoice' element={<AddInvoice />} />
                    <Route path='/add-incoming-invoice' element={<AddIncomingInvoice />} />
                    <Route path='/counterparties' element={<Counterparties />} />
                    <Route path='/warehouse' element={<Warehouse />} />
                    <Route path='/catalog' element={<Catalog />} />
                    <Route path='/employees' element={<Employees />} />
                    <Route path='/gps-system' element={<GpsSystem />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;