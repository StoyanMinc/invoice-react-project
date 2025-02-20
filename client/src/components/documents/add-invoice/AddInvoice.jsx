import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { outInvoicecService } from "../../../api/invoice-api.js";
import formatDate from "../../../utils/formatDate.js";
import calculateExpireDate from "../../../utils/calculateExpireDate.js";
import { useGetAllClients } from "../../../hooks/invoices-hooks/useClients.js";

export default function AddInvoice() {

    const [proformaNumber, setProformaNumber] = useState();
    const [invoiceNumber, setInvoiceNumber] = useState();

    const clients = useGetAllClients();
    console.log(clients);

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
    },[]);

    const navigate = useNavigate();
    
    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            client: '',
            mol: '',
            documentType: '',
            invoiceNumber: 111,
            invoiceDate: '',
            expireDate: '',
            paymentTerm: '',
            paymentType: '',
            bankChoise: ''
        }
    });

    const documentType = watch('documentType');

    useEffect(() => {
        if (documentType === "invoice") {
            setValue("invoiceNumber", invoiceNumber || "");
        } else if (documentType === "proforma") {
            setValue("invoiceNumber", proformaNumber || "");
        } else {
            setValue("invoiceNumber", "");
        }
    }, [documentType, invoiceNumber, proformaNumber, setValue]);

    const [products, setProducts] = useState([{
        name: '',
        measure: 'br',
        qty: 0,
        unitPrice: 0,
        to: 0
    }]);

    const handleInputChange = (index, field, value) => {
        const newProducts = products.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );

        if (index === products.length - 1 && value !== "") {
            newProducts.push({
                name: '',
                measure: 'br',
                qty: 0,
                unitPrice: 0,
                to: 0
            });
        }

        setProducts(newProducts);
    };

    const subTotal = products.reduce((total, product) => {
        return total + product.qty * product.unitPrice
    }, 0);

    const DDS = subTotal * 0.2;
    const totalPrice = subTotal + DDS;

    const submitHandlder = async (values) => {
        const requestData = {
            ...values,
            totalPrice,
            products
        };
        try {
            if(!requestData.client) {
                return alert('Please choose client!');
            }
            requestData.invoiceDate = formatDate(requestData.invoiceDate);
            requestData.expireDate = calculateExpireDate(requestData.invoiceDate, requestData.paymentTerm);
            await outInvoicecService.createInvoice(requestData);
            navigate('/documents/sales');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="add-invoice-container">

            <div className="add-invoice-form-contaier">

                <h4>Добавяне на изходна фактура (12312312)</h4>
                <form action="POST" className="add-invoice-form" onSubmit={handleSubmit(submitHandlder)}>

                    <div className="input-container col-3">
                        <label htmlFor="client">Клиент</label>
                        <select className="invoice-add-input" name="client" id="client" {...register('client')}>
                           {clients.map(client => 
                            <option key={client._id} value={client._id}>{client.nameOfClient}</option>
                           )}
                        </select>
                    </div>

                    <div className="input-container col-3">
                        <label htmlFor="mol">МОЛ</label>
                        <input className="invoice-add-input" type="text" name="mol" id="mol" {...register('mol')} />
                    </div>

                    <div className="input-container col-2">
                        <label htmlFor="documentType">Тип на документ</label>
                        <select className="invoice-add-input" name="documentType" id="documentType" {...register('documentType')}>
                            <option value="invoice">Фактура</option>
                            <option value="proforma">Проформа</option>
                        </select>
                    </div>

                    <div className="input-container col-2">
                        <label htmlFor="invoiceNumber">Фактура номер</label>
                        <input className="invoice-add-input" type="text" name="invoiceNumber" id="invoiceNumber" {...register('invoiceNumber')} readOnly/>
                    </div>

                    <div className="input-container col-2">
                        <label htmlFor="invoiceDate">Дата на фактура</label>
                        <input className="invoice-add-input" type="text" name="invoiceDate" id="invoiceDate" {...register('invoiceDate')} />
                    </div>

                    <div className="input-container col-3">
                        <label htmlFor="paymentTerm">Срок на плащане</label>
                        <select className="invoice-add-input" name="paymentTerm" id="paymentTerm" {...register('paymentTerm')}>
                            <option value="15">15 дни</option>
                            <option value="30">1 месец</option>
                        </select>
                    </div>

                    <div className="input-container col-3">
                        <label htmlFor="paymentType">Начин на плащане</label>
                        <select className="invoice-add-input" name="paymentType" id="paymentType" {...register('paymentType')}>
                            <option value="bankTransfer">Банков превод</option>
                            <option value="inCash">В брой</option>
                        </select>
                    </div>

                    <div className="input-container col-3">
                        <label htmlFor="bankChoise">Избор на банка</label>
                        <select className="invoice-add-input" name="bankChoise" id="bankChoise" {...register('bankChoise')}>
                            <option value="dsk">DSK</option>
                            <option value="obb">OBB</option>
                        </select>
                    </div>
                </form>
            </div>

            <div className="add-invoice-table-container">
                <table className="add-invoice-table">
                    <thead>
                        <tr>
                            <th className="table-n td-n">N</th>
                            <th>Описание на стока/услуга</th>
                            <th>Мярка</th>
                            <th>К-во</th>
                            <th>Ед.цена</th>
                            <th>T.O.%</th>
                            <th className="table-n">Стойност</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td className="table-n">{index + 1}</td>

                                <td className="long-table-td">
                                    <input type="text" value={product.name} onChange={(e) => handleInputChange(index, "name", e.target.value)} />
                                </td>
                                <td className="middle-table-td">
                                    <select name="count" value={product.measure} onChange={(e) => handleInputChange(index, 'measure', e.target.value)}>
                                        <option value="count">бр</option>
                                        <option value="hh">ч.ч</option>
                                    </select>
                                </td>
                                <td className="short-table-td">
                                    <input type="number" placeholder="0" value={product.qty} onChange={(e) => handleInputChange(index, 'qty', e.target.value)} />
                                </td>
                                <td className="short-table-td">
                                    <input type="number" placeholder="0" value={product.unitPrice} onChange={(e) => handleInputChange(index, 'unitPrice', e.target.value)} />
                                </td>
                                <td className="short-table-td">
                                    <input type="number" placeholder="0" value={product.to} onChange={(e) => handleInputChange(index, 'to', e.target.value)} />
                                </td>
                                <td className="table-n td-values">
                                    0
                                </td>

                            </tr>
                        ))}
                        <tr>
                            <td colSpan={5}></td>
                            <td className="table-n" >Субтотал</td>
                            <td className="table-n">{subTotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan={5}></td>
                            <td className="table-n">ДДС 20%</td>
                            <td className="table-n">{DDS.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan={5}></td>
                            <td className="table-n">Общо ДДС</td>
                            <td className="table-n">{totalPrice.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='add-invoice-footer'>
                <button className="button-go-back" >Назад</button>
                <button className="action-button" >Добавяне и печат</button>
                <button className="action-button" type="button" onClick={handleSubmit(submitHandlder)}>Добавяне</button>
            </div>
        </div>
    )
}
