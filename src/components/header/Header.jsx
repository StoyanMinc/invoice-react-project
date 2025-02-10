import { Link } from "react-router-dom";

export default function Header() {
    return( 
        <header>
            <div className="nav-container">
                <nav>
                    <ul>
                        <li><Link className="active" to="/">начало</Link></li>
                        <li><Link to="/documents">документи</Link></li>
                        <li><Link to="/counterparties">контрагенти</Link></li>
                        <li><Link to="/warehouse">склад</Link></li>
                        <li><Link to="/catalog">магазин</Link></li>
                        <li><Link to="/employees">служители</Link></li>
                        <li><Link to="/gps-system">gps система</Link></li>
                    </ul>
                </nav>
            </div>

            <div className="user-container">
                <i className="bell"></i>
                <span className="user-first-letter">T</span>
                <span className="user-name" >Тодор Тодоров</span>
            </div>
        </header>
    )
}