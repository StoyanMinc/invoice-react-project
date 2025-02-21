import { Link, useNavigate } from "react-router-dom"
import { useGetOutInvoices } from "../../../hooks/invoices-hooks/useOutInvoices";
import { useState } from "react";
import { outInvoicecService } from "../../../api/invoice-api";

export default function Sales() {
    const invoices = useGetOutInvoices();
    const navigate = useNavigate();

    const [selectedType, setSelectedType] = useState('all');

    const filteredInvoices = invoices.filter((invoices) => {
        if (selectedType === 'all') {
            return true;
        }
        return selectedType === 'onlyInvoices'
            ? invoices.documentType !== 'проформа'
            : invoices.documentType === 'проформа';
    });

    const totalInvoicesPrice = filteredInvoices.map(i => i.totalPrice).reduce((a, c) => a + c, 0);

    return (
        <div className="documents-sales-container">
            <div className="documents-type-document">
                <table>
                    <thead>
                        <tr>
                            <th>Тип на документ</th>
                        </tr>
                        <tr>
                            <td className={selectedType === 'all' ? "active-sales-type" : ''} onClick={() => setSelectedType('all')} >Всички</td>
                        </tr>
                        <tr>
                            <td className={selectedType === 'onlyInvoices' ? "active-sales-type" : ''} onClick={() => setSelectedType('onlyInvoices')} >Фактури</td>
                        </tr>
                        <tr>
                            <td className={selectedType === 'proforma' ? "active-sales-type" : ''} onClick={() => setSelectedType('proforma')} >Проформа фактури</td>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="documents-output-invoices-holder">
                <div className="documents-output-invoices-holder-title">
                    <h3>Изходящи фактури ({filteredInvoices.length})</h3>
                    <div className="documents-output-invoices-options">
                        <input type="text" className="documents-output-invoice-search" placeholder="Търсене" />
                        <button onClick={() => navigate('/documents/sales/add-invoice')} className="submit-add-invoice-btn" >Добавяне на фактура</button>
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
                            {filteredInvoices.map((invoice, i) =>
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
                                        <Link to={'/'} className="action-icon edit-icon"></Link>
                                        <Link to={`/print-invoice/${invoice._id}`} className="action-icon print-icon"></Link>
                                        <Link to={'/'} className="action-icon dollars-bag-icon"></Link>
                                        <Link to={'/'} className="action-icon files-icon"></Link>
                                        <Link to={'/'} className="action-icon message-icon"></Link>
                                        <Link className="action-icon bin-icon"></Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="total-invoices">
                        <span className="total-invoices-span">Общо фактури: {filteredInvoices.length}</span>
                        <span className="total-money-span">Тотал: {totalInvoicesPrice.toFixed(2)} лв</span>
                    </div>
                </div>

            </div>
        </div>
    )
}