import { Route, Routes } from 'react-router-dom';
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
import AddIncomingInvoice from './components/documents/add-incoming-invoice/AddIncomingInvoice';
import AddAutomaticInvoice from './components/documents/add-automatic-invoice/AddAutomaticInvoice';
import AutomaticInvoice from './components/documents/automatic-invoice/AutomaticInvoice';
import PrintInvoice from './components/documents/print-invoice/PrintInvoice';
import AddCounterparties from './components/counterparties/AddCounterparties';
import UpdateInvoice from './components/documents/update-invoice/UpdateInvoice';
function App() {
    return (
        <div className="container">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='/documents/sales' element={<Documents />} />
                    <Route path='/documents/sales/add-invoice' element={<AddInvoice />} />
                    <Route path='/documents/sales/:invoiceId/edit' element={<UpdateInvoice />} />
                    <Route path='/documents/expenses' element={<Expenses />} />
                    <Route path='/documents/expenses/add-incoming-invoice' element={<AddIncomingInvoice />} />
                    <Route path='/documents/automatic-invoice' element={<AutomaticInvoice />} />
                    <Route path='/documents/automatic-invoice/add-automatic-invoice' element={<AddAutomaticInvoice />} />
                    <Route path='/counterparties' element={<Counterparties />} />
                    <Route path='/counterparties/add-counterparties' element={<AddCounterparties />} />
                    <Route path='/warehouse' element={<Warehouse />} />
                    <Route path='/catalog' element={<Catalog />} />
                    <Route path='/employees' element={<Employees />} />
                    <Route path='/gps-system' element={<GpsSystem />} />
                    <Route path='/print-invoice/:invoiceId' element={<PrintInvoice />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;