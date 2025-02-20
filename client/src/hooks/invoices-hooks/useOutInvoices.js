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

export async function useGetLastInvoiceNumber() {
    const lastInvoice = await outInvoicecService.getLastInvoice();
    const InvoiceNumber = lastInvoice.InvoiceNumber;

};

export async function useGetLastProformaNumber() {
    const [proformaNumber, setProformaNumber] = useState();

    useEffect(() => {
        (async () => {
            const result = await outInvoicecService.getLastProforma();
            const lastProformaNumber = result[0].invoiceNumber;
            setProformaNumber(lastProformaNumber);
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