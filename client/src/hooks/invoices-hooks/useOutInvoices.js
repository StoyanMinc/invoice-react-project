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

export function useGetLatestOutInvoices() {
    const [lastInvoices, setLastInvoices] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await outInvoicecService.getLatestInvoices();
            setLastInvoices(result);
        })();
    }, []);

    return lastInvoices;
}