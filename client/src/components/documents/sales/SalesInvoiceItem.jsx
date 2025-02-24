import { Link, useNavigate } from "react-router-dom"
import { outInvoicecService } from "../../../api/invoice-api.js";

export default function SalesInvoiceItem({ invoice }) {
    const navigate = useNavigate();
      const deleteInvoiceHandler = async (invoiceId) => {
            await outInvoicecService.deleteInvoce(invoiceId);
            navigate('/documents/sales');
        }
    return (
        <tr key={invoice._id}>
            <td>{invoice.invoiceNumber}</td>
            <td>{invoice.invoiceDate}</td>
            <td>{invoice.documentType}</td>
            <td>{invoice.client.nameOfClient}</td>
            <td><span>{invoice.totalPrice.toFixed(2)}</span>лв</td>
            <td>{invoice.paymentType}</td>
            {invoice.paymentStatus === 0
                ? <td ><span className="table-paid-info unpaid">чака плащане</span></td>
                : <td ><span className="table-paid-info paid">платена</span></td>
            }
            <td className="action-td">
                <Link to={`/documents/sales/${invoice._id}/edit`} className="action-icon edit-icon"></Link>
                <Link to={`/print-invoice/${invoice._id}`} className="action-icon print-icon"></Link>
                <Link to={'/'} className="action-icon dollars-bag-icon"></Link>
                <Link to={'/'} className="action-icon files-icon"></Link>
                <Link to={'/'} className="action-icon message-icon"></Link>
                <Link to={'/'} className="action-icon bin-icon" onClick={() => deleteInvoiceHandler(invoice._id)}></Link>
            </td>
        </tr>
    )
}