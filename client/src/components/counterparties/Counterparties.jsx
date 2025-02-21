import {useNavigate} from 'react-router-dom';
import { useGetAllClients } from '../../hooks/client-hook/useClients';

export default function Counterparties() {

    const clients = useGetAllClients();

    const navigate = useNavigate();
    return (
        <div className="counterparties-container">
            <div className="counterparties-container-header">
                <h3>Clients (2)</h3>
                <div className="couterparties-options">
                    <input type="text" className="clients-input-search" placeholder="Търсене" />
                    <button className="submit-add-invoice-btn" onClick={() => navigate('/counterparties/add-counterparties')} >Добавяне на клиент</button>
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
                        {clients.map(client =>
                        <tr key={client._id}>
                            <td>{client.nameOfClient}</td>
                            <td>{client.mol}</td>
                            <td>{client.typeOfClinet}</td>
                            <td>{client.eikEgn}</td>
                            <td>0 0</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}