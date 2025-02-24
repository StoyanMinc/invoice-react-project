import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAutomaticInvoices } from '../../../hooks/invoices-hooks/useAutomaticInvoices';
import AutomaticInvoiceItem from './AutomaticInvoiceItem';

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
                            {invoices.map((invoice, index) => <AutomaticInvoiceItem key={invoice._id} invoice={invoice} invoiceNumber={index + 1}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}