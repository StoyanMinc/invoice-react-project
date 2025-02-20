import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import generateOptions from "../../../utils/generateOptions";
import { automaticInvoiceService } from "../../../api/automatic-invoice.api";

export default function AddAutomaticInvoice() {
    const navigate = useNavigate();
    const options = generateOptions();

    const { register, handleSubmit } = useForm({
        defaultValues: {
            client: '',
            mol: '',
            dateOfAutomatization: '',
            paymentTerm: '',
            paymentType: '',
            bankChoise: ''
        }
    })

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
                temporary: '',
                measure: 'br',
                qty: 0,
                unitPrice: 0,
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
            await automaticInvoiceService.createInvoice(requestData);
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="add-invoice-container">

            <div className="add-invoice-form-contaier">

                <h4>Добавяне на автоматична фактура (12312312)</h4>
                <form action="POST" className="add-invoice-form" onSubmit={handleSubmit(submitHandlder)}>

                    <div className="input-container col-2">
                        <label htmlFor="client">Клиент</label>
                        <input className="invoice-add-input" type="text" name="client" id="client" {...register('client')} />
                    </div>

                    <div className="input-container col-2">
                        <label htmlFor="mol">МОЛ</label>
                        <input className="invoice-add-input" type="text" name="mol" id="mol" {...register('mol')} />
                    </div>

                    <div className="input-container col-2">
                        <label htmlFor="dateOfAutomatization">Месечна дата на автоматизация</label>
                        <select className="invoice-add-input" name="dateOfAutomatization" id="dateOfAutomatization" {...register('dateOfAutomatization')}>
                            {options.map((option, i) => <option key={i + 1} value={i + 1}>{option}</option>)}
                        </select>
                    </div>

                    <div className="input-container col-2">
                        <label htmlFor="paymentTerm">Срок на плащане</label>
                        <select className="invoice-add-input" name="paymentTerm" id="paymentTerm" {...register('paymentTerm')}>
                            <option value="15">15 дни</option>
                            <option value="30">1 месец</option>
                        </select>
                    </div>

                    <div className="input-container col-2">
                        <label htmlFor="paymentType">Начин на плащане</label>
                        <select className="invoice-add-input" name="paymentType" id="paymentType" {...register('paymentType')}>
                            <option value="bankTransfer">Банков превод</option>
                            <option value="inCash">В брой</option>
                        </select>
                    </div>

                    <div className="input-container col-2">
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
                            <th>Временен</th>
                            <th>Мярка</th>
                            <th>К-во</th>
                            <th>Ед.цена</th>
                            <th className="table-n">Стойност</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td className="table-n">{index + 1}</td>
                                {/* <td><input type="checkbox" /></td> */}
                                <td className="long-table-td">
                                    <input type="text" value={product.name} onChange={(e) => handleInputChange(index, "name", e.target.value)} />
                                </td>
                                <td className="short-table-td">checkbox</td>
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
                                <td className="table-n td-values">
                                    0
                                </td>

                            </tr>
                        ))}
                        <tr>
                            <td colSpan={4}></td>
                            <td className="table-n" >Субтотал</td>
                            <td className="table-n">{subTotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan={4}></td>
                            <td className="table-n">ДДС 20%</td>
                            <td className="table-n">{DDS.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan={4}></td>
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