import ReactDatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { useGetAllClients } from '../../../hooks/client-hook/useClients';
import { useEffect, useState } from 'react';
import { formatDateFromReactDatePicker } from '../../../utils/formatDate';
import { offerService } from '../../../api/offer-api';
import { useNavigate } from 'react-router-dom';

export default function AddOffer() {
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState('basic');

    const [products, setProducts] = useState([{
        name: '',
        measure: 'br',
        qty: 0,
        unitPrice: 0,
        to: 0
    }]);

    const clients = useGetAllClients();

    const { register, watch, setValue, handleSubmit } = useForm({
        defaultValues: {
            client: '',
            mol: '',
            offerType: '',
            offerDate: '',
            title: '',
        }
    });

    const client = watch('client');
    useEffect(() => {
        if (client) {
            const selectedClient = clients.find(c => c._id === client);
            if (selectedClient) {
                setValue('mol', selectedClient.mol);
            }
        }
    }, [client]);


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

    const subTotal = products?.reduce((total, product) => {
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
            requestData.offerDate = formatDateFromReactDatePicker(requestData.offerDate);
            await offerService.createOffer(requestData);
            navigate('/');
        } catch (error) {

        }

        console.log(requestData);
    };

    const changeTabHandler = (value) => {
        setCurrentTab(value);
    }
    return (
        <div className="add-offer-container">

            <h3>Добавяне на оферта</h3>
            <div className="add-offer-options">
                <div className="offer-spans-container">
                    <span className={currentTab === 'basic' ? "active-offer-span" : ''} onClick={() => changeTabHandler('basic')}>основна информация</span>
                    <span className={currentTab === 'articules' ? "active-offer-span" : ''} onClick={() => changeTabHandler('articules')}>артикули</span>
                    <span>забележки</span>
                </div>
            </div>

            {currentTab === 'basic' &&
                <div className="add-offer-form-container">
                    <form action="POST" onSubmit={handleSubmit(submitHandlder)}>
                        <div className="input-container col-3">
                            <label htmlFor="client">Клиент</label>
                            <select className="invoice-add-input" name="client" id="client" {...register('client')}>
                                <option value="">Изберете клиент</option>
                                {clients.map(c => <option key={c._id} value={c._id}>{c.nameOfClient}</option>)}
                            </select>
                        </div>
                        <div className="input-container col-3">
                            <label htmlFor="mol">Мол</label>
                            <input className="invoice-add-input" type="text" name="mol" id="mol" {...register('mol')} />
                        </div>
                        <div className="input-container col-3">
                            <label htmlFor="offerType">Тип Оферта</label>
                            <select name="offerType" id="offerType" className="invoice-add-input" {...register('offerType')}>
                                <option value="обект">Обект</option>
                                <option value="проект">Проект</option>
                            </select>
                        </div>

                        <div className="input-container col-2">
                            <label htmlFor="offerDate">Дата на оферта</label>
                            <ReactDatePicker
                                className="invoice-add-input"
                                selected={watch('offerDate') ? new Date(watch('offerDate')) : null}
                                onChange={(date) => setValue('offerDate', date)}
                                dateFormat="dd.MM.yyyy"
                                placeholderText="Изберете дата"
                            />
                        </div>
                        <div className="input-container col-3">
                            <label htmlFor="title">Заглавие</label>
                            <input className="invoice-add-input" type="text" name="title" id="title"  {...register('title')} />
                        </div>
                    </form>

                </div>
            }

            {currentTab === 'articules' && <div className="add-invoice-table-container">
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
            </div>}

            <div className='add-offer-footer'>
                <button className="offer-go-back" >Назад</button>
                <button className="offer-add-button" type="button" onClick={handleSubmit(submitHandlder)}>Добавяне</button>
            </div>
        </div>
    )
}