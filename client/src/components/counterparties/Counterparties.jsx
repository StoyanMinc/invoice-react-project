import {useNavigate} from 'react-router-dom';

export default function Counterparties() {

    const navigate = useNavigate();
    return (
        <div className="counterparties-container">
            <div className="counterparties-container-header">
                <h3>Clients (2)</h3>
                <div className="couterparties-options">
                    <input type="text" className="clients-input-search" placeholder="Търсене" />
                    <button className="submit-add-invoice-btn" onClick={() => navigate('/counterparties/add-counterparties')} >Добавяне на фактура</button>
                </div>
            </div>
            <div className="table-clients-container">
                <table className="table-clients">
                    <thead>
                        <tr>
                            <th>Клиент</th>
                            <th>МОЛ</th>
                            <th>Тип</th>
                            <th>ЕИК/ЕГН</th>
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>"Кристал Лес - 92" ЕООД</td>
                            <td>Исмес Трампов</td>
                            <td>Фирма</td>
                            <td>222222222</td>
                            <td>0 0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}