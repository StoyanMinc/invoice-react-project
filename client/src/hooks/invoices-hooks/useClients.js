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
}