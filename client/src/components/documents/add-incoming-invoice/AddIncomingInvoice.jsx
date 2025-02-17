import { useForm } from 'react-hook-form'

export default function AddIncomingInvoice() {

    const { register, handleSubmit, getValues } = useForm({
        defaultValues: {
            supplier: '',
            invoiceNumber: 0,
            invoiceDate: '',
            comment: '',
            paymentTerm: '',
            paymentType: '',
            sumForPay: 0,
            currency: ''
        }
    });

    return (

        <div className="add-invoice-container">

            <div className="add-invoice-form-contaier">

                <h4>Добавяне на входна фактура (12312312)</h4>

                <h5>Основна информация</h5>
                <form action="POST" className="add-invoice-form">

                    <div className="input-container col-3">
                        <label htmlFor="supplier">Доставчик</label>
                        <input className="invoice-add-input" type="text" name="supplier" id="supplier" {...register('supplier')} />
                    </div>

                    <div className="input-container col-3">
                        <label htmlFor="invoiceNumber">Фактура номер</label>
                        <input className="invoice-add-input" type="number" name="invoiceNumber" id="invoiceNumber" {...register('invoiceNumber')} />
                    </div>

                    <div className="input-container col-3">
                        <label htmlFor="invoiceDate">Дата на фактура</label>
                        <input className="invoice-add-input" type="text" name="invoiceDate" id="invoiceDate" {...register('invoiceDate')} />
                    </div>


                    <div className="input-container col-3">
                        <label htmlFor="comment">Коментар</label>
                        <input className="invoice-add-input" type="text" name="comment" id="comment" {...register('comment')} />
                    </div>


                    <div className="input-container col-3">
                        <label htmlFor="paymentTerm">Срок на плащане</label>
                        <select className="invoice-add-input" name="paymentTerm" id="paymentTerm" {...register('paymentTerm')} >
                            <option value="short">15 дни</option>
                            <option value="long">1 месец</option>
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

                    <div className="input-container col-3">
                        <label htmlFor="currency">Валута</label>
                        <select className="invoice-add-input" name="currency" id="currency" {...register('currency')} >
                            <option value="lv">лв.</option>
                            <option value="euro">евро</option>
                        </select>
                    </div>
                </form>
            </div>

            <div className='add-invoice-footer'>
                <button className="button-go-back" >Назад</button>
                <button className="action-button" >Добавяне и печат</button>
                <button className="action-button" type="button"  onClick={handleSubmit((values) => console.log(values))}>Добавяне</button>
            </div>
        </div>
    )
}