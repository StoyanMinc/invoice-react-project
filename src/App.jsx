import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Documents from './components/documents/Documents';
import Counterparties from './components/counterparties/Counterparties';
import Warehouse from './components/warehouse/Warehouse';
import Catalog from './components/catalog/Catalog';
import Employees from './components/employees/Employees';
import GpsSystem from './components/gpsSystem/GpsSystem';

function App() {
    return (
        <div className="container">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='/documents' element={<Documents />} />
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