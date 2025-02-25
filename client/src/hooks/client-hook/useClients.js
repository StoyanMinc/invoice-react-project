import { useEffect, useState } from "react";
import { clientService } from "../../api/client-api";

export function useGetAllClients() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await clientService.getAllClients();
            setClients(result);
        })();
    }, []);

    return clients;
};

export function useGetOneClient (clientId) {
    const [client, setClient] = useState({});

    useEffect(() => {
        (async () => {
            const result = await clientService.getOneClient(clientId);
            setClient(result);
        })();
    },[]);

    return client;
}