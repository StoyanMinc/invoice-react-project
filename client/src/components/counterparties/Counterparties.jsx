import { useNavigate, Link } from 'react-router-dom';
import { useGetAllClients } from '../../hooks/client-hook/useClients';
import { clientService } from '../../api/client-api';
import { useEffect, useState } from 'react';

export default function Counterparties() {
    const navigate = useNavigate();
    
    const [clientToShow, setClientToShow] = useState([]);
    const clients = useGetAllClients();

    useEffect(() => {
        setClientToShow(clients);
    }, [clients])
    
    const deleteClientHandler = async (clientId) => {
        try {
            await clientService.deleteClient(clientId);
            setClientToShow(clients => clients.filter(client => client._id !== clientId));
        } catch (error) {
            console.log(error.message);
        }
    }

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
                        {clientToShow.map(client =>
                            <tr key={client._id}>
                                <td>{client.nameOfClient}</td>
                                <td>{client.mol}</td>
                                <td>{client.typeOfClinet}</td>
                                <td>{client.eikEgn}</td>
                                <td>
                                    <Link to={`/counterparties/${client._id}/edit`} className="action-icon edit-icon"></Link>
                                    <button className="action-icon bin-icon" onClick={() => deleteClientHandler(client._id)} ></button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}