import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import DocumentsHeader from "../sub-headers/DocumentHeader";
export default function Header() {
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <>
            <header>
                <div className="nav-container">
                    <nav>
                        <ul>
                            <li><Link className="active" to="/">начало</Link></li>
                            <li><Link to="/documents/sales">документи</Link></li>
                            <li><Link to="/counterparties">контрагенти</Link></li>
                            <li><Link to="/warehouse">склад</Link></li>
                            <li><Link to="/catalog">магазин</Link></li>
                            <li><Link to="/employees">служители</Link></li>
                            <li><Link to="/gps-system">gps система</Link></li>
                        </ul>
                    </nav>
                </div>

                <div className="user-container">
                    <i className="bell has-notification"></i>
                    <span className="user-first-letter">T</span>
                    <span className="user-name" >Тодор Тодоров</span>
                </div>
            </header>
            {currentPath.includes('documents') && <DocumentsHeader />}
        </>
    )
}