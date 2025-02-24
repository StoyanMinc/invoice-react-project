import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';

import { incomingInvoicecService } from '../../../api/incoming-invoice-api';
import calculateExpireDate from '../../../utils/calculateExpireDate';
import { formatDateFromReactDatePicker } from '../../../utils/formatDate';

export default function AddIncomingInvoice() {

    const navigate = useNavigate();
    const [fileBase64, setFileBase64] = useState("");

    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            supplier: '',
            invoiceNumber: 0,
            invoiceDate: '',
            comment: '',
            paymentTerm: '',
            paymentType: '',
            sumForPay: 0,
            currency: '',
            expireDate: '',
            invoiceFileHandler: ''
        }
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file); // Convert file to Base64
            reader.onload = () => {
                const base64File = reader.result.split(",")[1];
                setFileBase64(reader.result.split(",")[1]);
                setValue('invoiceFileHandler', base64File);
            };
        }
    };

    const submitHandlder = async (values) => {
        try {
            values.invoiceDate = formatDateFromReactDatePicker(values.invoiceDate);
            values.expireDate = calculateExpireDate(values.invoiceDate, values.paymentTerm);
            values.invoiceFileHandler = fileBase64;
            values.paymentStatus = 0;
            await incomingInvoicecService.createInvoice(values);
            navigate('/documents/expenses');
        } catch (error) {
            console.log(error.message);
        }
    }
    return (

        <div className="add-invoice-container">

            <div className="add-invoice-form-contaier">

                <h4>Добавяне на входна фактура (12312312)</h4>

                <h5>Основна информация</h5>
                <form action="POST" className="add-invoice-form" onSubmit={handleSubmit(submitHandlder)}>

                    <div className="input-container col-3">
                        <label htmlFor="supplier">Доставчик</label>
                        <input className="invoice-add-input" type="text" name="supplier" id="supplier" {...register('supplier')} />
                    </div>

                    <div className="input-container col-3">
                        <label htmlFor="invoiceNumber">Фактура номер</label>
                        <input className="invoice-add-input" type="number" name="invoiceNumber" id="invoiceNumber" {...register('invoiceNumber')} />
                    </div>

                    <div className="input-container col-2">
                        <label htmlFor="invoiceDate">Дата на фактура</label>
                        <ReactDatePicker className="invoice-add-input"
                            selected={watch('invoiceDate') ? new Date(watch('invoiceDate')) : null}
                            onChange={(date) => setValue('invoiceDate', date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Изберете дата" />
                    </div>


                    <div className="input-container col-3">
                        <label htmlFor="comment">Коментар</label>
                        <input className="invoice-add-input" type="text" name="comment" id="comment" {...register('comment')} />
                    </div>


                    <div className="input-container col-3">
                        <label htmlFor="paymentTerm">Срок на плащане</label>
                        <select className="invoice-add-input" name="paymentTerm" id="paymentTerm" {...register('paymentTerm')} >
                            <option value="15">15 дни</option>
                            <option value="30">1 месец</option>
                        </select>
                    </div>

                    <div className="input-container col-3">
                        <label htmlFor="paymentType">Начин на плащане</label>
                        <select className="invoice-add-input" name="paymentType" id="paymentType" {...register('paymentType')} >
                            <option value="bankTransfer">Банков превод</option>
                            <option value="inCash">В брой</option>
                        </select>
                    </div>

                    <div className="input-container col-3">
                        <label htmlFor="sumForPay">Сума за плащане (С ДДС)</label>
                        <input className="invoice-add-input" type="number" name="sumForPay" id="sumForPay" {...register('sumForPay')} />
                    </div>

                    <div className="input-container col-3 currency-container">
                        <label htmlFor="currency">Валута</label>
                        <select className="invoice-add-input" name="currency" id="currency" {...register('currency')} >
                            <option value="lv">лв.</option>
                            <option value="euro">евро</option>
                        </select>
                    </div>
                    <h5 className='file-title'>Документация</h5>
                    <div className="input-container file-container">
                        <input className="invoice-add-input file-input" type="file" accept=".pdf" name='invoiceFile' id='invoiceFile' onChange={handleFileChange} />
                        <label htmlFor="invoiceFile" className='file-label'></label>
                        <p className='file-p'>Избери фаил</p>
                    </div>
                </form>
            </div>

            <div className='add-invoice-footer'>
                <button className="button-go-back" >Назад</button>
                <button className="action-button" type="button" onClick={handleSubmit(submitHandlder)}>Добавяне</button>
            </div>
        </div>
    )
}