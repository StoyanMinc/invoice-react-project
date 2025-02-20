import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import DocumentsHeader from "../sub-headers/DocumentHeader";
export default function Header() {
    const location = useLocation();
    const currentPath = location.pathname;
    const currenPage = currentPath.split('/')[1];
    return (
        <>
            <header>
                <div className="nav-container">
                    <nav>
                        <ul>
                            <li><Link className={currenPage === '' ? 'active' : ''} to="/">начало</Link></li>
                            <li><Link className={currenPage === 'documents' ? 'active' : ''} to="/documents/sales">документи</Link></li>
                            <li><Link className={currenPage === 'counterparties' ? 'active' : ''} to="/counterparties">контрагенти</Link></li>
                            <li><Link className={currenPage === 'warehouse' ? 'active' : ''} to="/warehouse">склад</Link></li>
                            <li><Link className={currenPage === 'catalog' ? 'active' : ''} to="/catalog">магазин</Link></li>
                            <li><Link className={currenPage === 'employees' ? 'active' : ''} to="/employees">служители</Link></li>
                            <li><Link className={currenPage === 'gps-system' ? 'active' : ''} to="/gps-system">gps система</Link></li>
                        </ul>
                    </nav>
                </div>

                <div className="user-container">
                    <i className="bell has-notification"></i>
                    <span className="user-first-letter">T</span>
                    <span className="user-name" >Тодор Тодоров</span>
                </div>
            </header>
            {currentPath.startsWith('/documents') && <DocumentsHeader />}
        </>
    )
}