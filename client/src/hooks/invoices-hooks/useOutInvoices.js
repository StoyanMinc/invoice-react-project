import { useEffect, useState } from "react";
import { outInvoicecService } from "../../api/invoice-api";


export function useGetOutInvoices() {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await outInvoicecService.getAllInvoices();
            setInvoices(result);

        })();
    }, [])

    return invoices;
};