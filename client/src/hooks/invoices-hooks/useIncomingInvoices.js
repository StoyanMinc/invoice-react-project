import { useEffect, useState } from "react";
import { incomingInvoicecService } from "../../api/incoming-invoice-api";


export function useGetIncomingInvoices() {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await incomingInvoicecService.getAllInvoices();
            setInvoices(result);

        })();
    }, [])

    return invoices;
};

export function useGetLastIncomeInvoices() {
    const [lastInvoices, setLastInvoices] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await incomingInvoicecService.getLastInvoices();
            setLastInvoices(result);
        })();
    },[])

    return lastInvoices;
}