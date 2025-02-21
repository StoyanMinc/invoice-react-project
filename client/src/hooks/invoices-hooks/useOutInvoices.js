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
};

export function useGetLastInvoiceNumber() {
    const [invoiceNumber, setInvoiceNumber] = useState();

    useEffect(() => {
        (async () => {
            const result = await outInvoicecService.getLastInvoice();
            if(result.length > 0) {
                const lastInvoiceNumber = result[0].invoiceNumber;
                setInvoiceNumber(lastInvoiceNumber + 1);
            } else {
                setInvoiceNumber(2000000001);
            }
        })();
    }, []);
    return invoiceNumber;
};

export function useGetLastProformaNumber() {
    const [proformaNumber, setProformaNumber] = useState();

    useEffect(() => {
        (async () => {
            const result = await outInvoicecService.getLastProforma();
            if(result.length > 0) {
                const lastProformaNumber = result[0].invoiceNumber;
                setProformaNumber(lastProformaNumber + 1);
            } else {
                setProformaNumber(3000000001);
            }
        })();
    }, []);
    return proformaNumber;
};

export function useGetOneInvoice(invoiceId) {
    const [invoice, setInvoice] = useState({});

    useEffect(() => {
        (async () => {
            const result = await outInvoicecService.getOneInvoice(invoiceId);
            setInvoice(result);
        })();
    },[]);

    return invoice;

}