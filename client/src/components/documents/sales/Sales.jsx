import { useNavigate } from "react-router-dom"
import { useGetOutInvoices } from "../../../hooks/invoices-hooks/useOutInvoices";
const banks = {
    dsk: 'ДСК',
    obb: 'ОББ'
}

const payment = {
    inCash: 'В брой',
    bankTransfer: 'Банков трансфер'
}

export default function Sales() {
    const invoices = useGetOutInvoices();

    const navigate = useNavigate();
    const goToAddInvoice = () => navigate('/documents/sales/add-invoice');

    const totalInvoicesPrice = invoices.map(i => i.totalPrice).reduce((a, c) => a + c, 0);

    return (
        <div className="documents-sales-container">
            <div className="documents-type-document">
                <table>
                    <thead>
                        <tr>
                            <th>Тип на документ</th>
                        </tr>
                        <tr>
                            <td className="active-sales-type" >Всички</td>
                        </tr>
                        <tr>
                            <td>Фактури</td>
                        </tr>
                        <tr>
                            <td>Проформа фактури</td>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="documents-output-invoices-holder">
                <div className="documents-output-invoices-holder-title">
                    <h3>Изходящи фактури ({invoices.length})</h3>
                    <div className="documents-output-invoices-options">
                        <input type="text" className="documents-output-invoice-search" placeholder="Търсене" />
                        <button onClick={goToAddInvoice} className="submit-add-invoice-btn" >Добавяне на фактура</button>
                        <button className="documents-output-take-reference">Справка</button>
                    </div>
                </div>
                <div className="tables-sales-container">
                    <table className="documents-salse-table">
                        <thead>
                            <tr>
                                <th>Номер</th>
                                <th>Дата на фактура</th>
                                <th>Тип</th>
                                <th>Клиент</th>
                                <th>Стойност</th>
                                <th>Тип на плащане</th>
                                <th>Статус</th>
                                <th>Действие</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((invoice, i) =>
                                <tr key={invoice._id}>
                                    <td>{i + 1}</td>
                                    <td>{invoice.invoiceDate}</td>
                                    {invoice.documentType === 'proforma'
                                        ? <td>Проформа</td>
                                        : <td>Фактура</td>
                                    }
                                    <td>{invoice.client}</td>
                                    <td><span>{invoice.totalPrice.toFixed(2)}</span>лв</td>
                                    {/* {invoice.paymentType === 'bankTransfer'
                                        ? <td>Банков трансфер</td>
                                        : <td>В брой</td>
                                    } */}
                                    <td>{payment[invoice.paymentType]}</td>

                                    <td ><span className="table-paid-info unpaid">чака плащане</span></td>
                                    <td> 0 0 0 0</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="total-invoices">
                        <span className="total-invoices-span">Общо фактури: {invoices.length}</span>
                        <span className="total-money-span">Тотал: {totalInvoicesPrice.toFixed(2)} лв</span>
                    </div>
                </div>

            </div>
        </div>
    )
}