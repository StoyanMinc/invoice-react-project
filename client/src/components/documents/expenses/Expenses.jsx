import { useNavigate } from "react-router-dom"
import { useGetIncomingInvoices } from "../../../hooks/invoices-hooks/useIncomingInvoices";

export default function Expenses() {

    const navigate = useNavigate();

    const incomingInvoices = useGetIncomingInvoices();
    const totalInvoicesPrice = incomingInvoices.map(i => i.sumForPay).reduce((a, c) => a + c, 0);
    return (

        <div className="documents-income-invoices-holder">
            <div className="documents-income-invoices-holder-title">
                <h3>Входящи фактури (11111)</h3>
                <div className="documents-income-invoices-options">
                    <input type="text" className="documents-income-invoices-search" placeholder="Търсене" />
                    <button className="submit-add-invoice-btn" onClick={() => navigate('/documents/expenses/add-incoming-invoice')} >Добавяне на фактура</button>
                </div>
            </div>
            <div className="income-tables-container">

                <table className="documents-expenses-table">
                    <thead>
                        <tr>
                            <th>Номер</th>
                            <th>Дата на фактура</th>
                            <th>Доставчик</th>
                            <th>Стойност</th>
                            <th>Дата на изтичане</th>
                            <th>Статус</th>
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incomingInvoices.map(invoice =>
                            <tr key={invoice._id}>
                                <td><a target="_blank" href={`http://localhost:5001/${invoice.invoiceFile}`}>{invoice.invoiceNumber}</a></td>
                                <td>{invoice.invoiceDate}</td>
                                <td>{invoice.supplier}</td>
                                <td>{invoice.sumForPay.toFixed(2)}лв.</td>
                                <td>123</td>
                                {invoice.paymentStatus === 0
                                ?<td ><span className="table-paid-info unpaid">чака плащане</span></td>
                                : <td ><span className="table-paid-info paid">платена</span></td>
                                }
                                <td> 0 0 0 0</td>
                            </tr>)}
                    </tbody>
                </table>
                <div className="total-invoices">
                    <span className="total-invoices-span">Общо фактури: {incomingInvoices.length}</span>
                    <span className="total-money-span">Тотал: {totalInvoicesPrice} лв</span>
                </div>
            </div>
        </div>

    )
}