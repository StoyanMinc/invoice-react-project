import { Link } from "react-router-dom"

export default function DocumentsHeader() {
    return (
        <div className="sub-header-documents">
            <nav>
                <ul className="document-ul">
                    <li><Link className="active" to='/documents/sales'> продажби</Link></li>
                    <li><Link to='/documents/expenses'>разходи</Link></li>
                    <li>автоматични таксувания</li>
                    <li>оферти</li>
                    <li>товарителници</li>
                </ul>
            </nav>
        </div>
    )
}