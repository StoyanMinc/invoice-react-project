import { useNavigate } from "react-router-dom"

export default function Expenses() {

    const navigate = useNavigate();


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
                        <tr>
                            <td>1111111111</td>
                            <td>11.02.2025</td>
                            <td>Пламен Костов</td>
                            <td>2200.00лв.</td>
                            <td>30.05.2025</td>
                            <td ><span className="table-paid-info unpaid">чака плащане</span></td>
                            <td> 0 0 0 0</td>
                        </tr>
                        <tr>
                            <td>1111111111</td>
                            <td>11.02.2025</td>
                            <td>Пламен Костов</td>
                            <td>2200.00лв.</td>
                            <td>30.05.2025</td>
                            <td ><span className="table-paid-info unpaid">чака плащане</span></td>
                            <td> 0 0 0 0</td>
                        </tr>
                        <tr>
                            <td>1111111111</td>
                            <td>11.02.2025</td>
                            <td>Пламен Костов</td>
                            <td>2200.00лв.</td>
                            <td>30.05.2025</td>
                            <td ><span className="table-paid-info paid">платена</span></td>
                            <td> 0 0 0 0</td>
                        </tr>
                    </tbody>
                </table>
                <div className="total-invoices">
                    <span className="total-invoices-span">Общо фактури: 0</span>
                    <span className="total-money-span">Тотал: 0 лв</span>
                </div>
            </div>
        </div>

    )
}