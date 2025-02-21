import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAutomaticInvoices } from '../../../hooks/invoices-hooks/useAutomaticInvoices';

export default function AutomaticInvoice() {

    const navigate = useNavigate();

    const invoices = useGetAutomaticInvoices();
    return (
        <div className="automatic-charging-container">
            <div className="automatic-charging-title">
                <h3>Aвтоматични такси (2)</h3>
                <div className="automatic-charging-options">
                    <input type="text" className="automatic-charging-search" placeholder="Търсене" />
                    <button className="submit-add-invoice-btn" onClick={() => navigate('/documents/automatic-invoice/add-automatic-invoice')} >Добавяне на такса</button>
                </div>
                <div className="automatic-charging-table-container">
                    <table className="automatic-charging-table">
                        <thead>
                            <tr>
                                <th><input type="checkbox" /></th>
                                <th>Номер</th>
                                <th>Дата в месеца</th>
                                <th>Клиент</th>
                                <th>Стойност</th>
                                <th>Тип на плащане</th>
                                <th>Брой неплатени</th>
                                <th>Действие</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((invoice, index) =>
                                <tr key={invoice._id}>
                                    <td><input type="checkbox" /></td>
                                    <td>{index + 1}</td>
                                    <td>{invoice.dateOfAutomatization}</td>
                                    <td>{invoice.client.nameOfClient}</td>
                                    <td>{invoice.sumForPay}лв</td>
                                    <td>{invoice.paymentType}</td>
                                    <td>0</td>
                                    <td>0 0 0 0</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}