import { Link, useNavigate } from "react-router-dom";
import { automaticInvoiceService } from "../../../api/automatic-invoice.api";

export default function AutomaticInvoiceItem({ invoice, invoiceNumber }) {
    const navigate = useNavigate();

    const deleteInvoiceHandler = async (invoiceId) => {
        await automaticInvoiceService.removeInvoice(invoiceId);
        navigate('/documents/automatic-invoice');
    }

    const totalPrice = invoice.products.map(product => Number(product.qty) * Number(product.unitPrice)).reduce((a, c) => a + c, 0);
    return (
        <tr key={invoice._id}>
            <td><input type="checkbox" /></td>
            <td>{invoiceNumber}</td>
            <td>{invoice.dateOfAutomatization}</td>
            <td>{invoice.client.nameOfClient}</td>
            <td>{totalPrice.toFixed(2)}лв</td>
            <td>{invoice.paymentType}</td>
            <td>0</td>
            <td>
                <Link className="action-icon edit-icon"  ></Link>
                <Link to={'/'} onClick={() => deleteInvoiceHandler(invoice._id)} className="action-icon bin-icon" ></Link>
            </td>
        </tr>
    )
}