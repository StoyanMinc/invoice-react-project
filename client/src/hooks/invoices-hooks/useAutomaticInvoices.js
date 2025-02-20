import { useEffect, useState } from "react";
import { automaticInvoiceService } from "../../api/automatic-invoice.api";

export function useGetAutomaticInvoices() {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await automaticInvoiceService.getAllInvoices();
            setInvoices(result);
        })();
    }, []);

    return invoices;
}