import { useNavigate } from "react-router-dom"

export default function Expenses() {

    const navigate = useNavigate();
    

    return (

        <div className="documents-output-ivoices-holder">
            <div className="documents-output-ivoices-holder-title">
                <h3>Изходящи фактури (<span>12345</span>)</h3>
                <div className="documents-output-invoices-options">
                    <input type="text" className="documents-output-ivoicec-searc" />
                    <button onClick={() => navigate('/add-incoming-invoice')} >Добавяне на фактура</button>
                </div>
            </div>
            <div className="tables-container">

                <table className="documents-salse-table">
                    <thead>
                        <tr>
                            <th>Номер</th>
                            <th>Датана фактура</th>
                            <th>Тип</th>
                            <th>Клиент</th>
                            <th>Стойност</th>
                            <th>Тип на плащане</th>
                            <th>Статус</th>
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1111111111</td>
                            <td>11.02.2025</td>
                            <td>Фактура</td>
                            <td>"САНГЕЛ Системтехник България" ЕООД</td>
                            <td><span>180.00</span>лв</td>
                            <td>Банков превод</td>
                            <td ><span className="table-paid-info unpaid">чака плащане</span></td>
                            <td> 0 0 0 0</td>
                        </tr>
                        <tr>
                            <td>1111111111</td>
                            <td>11.02.2025</td>
                            <td>Фактура</td>
                            <td>ЕТ"КЕМАЛ БОЗОВ"</td>
                            <td><span>282.96</span>лв</td>
                            <td>Банков превод</td>
                            <td ><span className="table-paid-info paid">платена</span></td>
                            <td> 0 0 0 0</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="total-invoices">
                <p>Общо фактури: <span>1796</span></p>
                <p>Тотал: <span>2694868.82</span> лв.</p>
            </div>
        </div>
    )
}