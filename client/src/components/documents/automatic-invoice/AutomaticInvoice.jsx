import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AutomaticInvoice() {

    const navigate = useNavigate();

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
                                <th><input type="checkbox"  /></th>
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
                            <tr>
                                <td><input type="checkbox"  /></td>
                                <td>14</td>
                                <td>23</td>
                                <td>"Стоянов и Ко" ЕООД</td>
                                <td>61.20лв</td>
                                <td>Банков превод</td>
                                <td>0</td>
                                <td>0 0 0 0</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" /></td>
                                <td>14</td>
                                <td>23</td>
                                <td>"Стоянов и Ко" ЕООД</td>
                                <td>61.20лв</td>
                                <td>Банков превод</td>
                                <td>0</td>
                                <td>0 0 0 0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}