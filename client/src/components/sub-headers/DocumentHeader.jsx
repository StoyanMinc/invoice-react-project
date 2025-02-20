import { Link, useLocation } from "react-router-dom"

export default function DocumentsHeader() {
    const location = useLocation();

    const pathLength = location.pathname.split('/').length;
    const currentPath = location.pathname.split('/')[2];

    return (
        <div className="sub-header-documents">
            <nav style={{ display: pathLength > 3 ? 'none' : 'block' }} >
                <ul className="document-ul">
                    <li><Link className={currentPath === 'sales' ? 'active' : ''} to='/documents/sales'> продажби</Link></li>
                    <li><Link className={currentPath === 'expenses' ? 'active' : ''} to='/documents/expenses'>разходи</Link></li>
                    <li><Link className={currentPath === 'automatic-invoice' ? 'active' : ''} to={'/documents/automatic-invoice'}>автоматични таксувания</Link></li>
                    <li><Link to={'/documents/offers'}>оферти</Link></li>
                    <li><Link to={'/documents/bil-of-lading'}>товарителници</Link></li>
                </ul>
            </nav>
        </div>
    )
}