import { useForm } from "react-hook-form"
import { clientService } from "../../api/client-api";
import { useNavigate } from "react-router-dom";

export default function AddCounterparties() {

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({
        defaultValues: {
            typeOfClinet: '',
            nameOfClient: '',
            mol: '',
            eikEgn: '',
            identN: '',
            address: '',
            city: '',
            country: '',
            email: '',
            phoneNumber: '',
            webSite: '',
        }
    });

    const submitHandlder = async (values) => {
        try {
            await clientService.createClient(values);
            navigate('/counterparties');
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className="add-counterparties-form-container">
            <h3>Добавяне на клиент</h3>

            <form action="POST" className="add-counterparties-form" onSubmit={handleSubmit(submitHandlder)}>
                <h4>Основна информация</h4>

                <div className="input-holder col-3">
                    <label htmlFor="typeOfClient">Тип клиент</label>
                    <select name="typeOfClinet" id="typeOfClient" {...register('typeOfClinet')}>
                        <option value="firm">Фирма</option>
                        <option value="privatePerson">Частно лице</option>
                    </select>
                </div>

                <div className="input-holder col-6">
                    <label htmlFor="nameOfClient">Име на фирма/клиент</label>
                    <input type="text" name="nameOfClient" id="nameOfClient" {...register('nameOfClient')}/>
                </div>

                <div className="input-holder col-3">
                    <label htmlFor="mol">МОЛ</label>
                    <input type="text" name="mol" id="mol" {...register('mol')} />
                </div>

                <div className="input-holder col-3">
                    <label htmlFor="eikEgn">ЕИК/ЕГН</label>
                    <input type="text" name="eikEgn" id="eikEgn" {...register('eikEgn')}/>
                </div>

                <div className="input-holder col-3">
                    <label htmlFor="identN">Идент.N ДДС</label>
                    <input type="text" name="identN" id="identN" {...register('identN')}/>
                </div>

                <h4>Местоположение</h4>
                <div className="input-holder col-3">
                    <label htmlFor="address">Адрес</label>
                    <input type="text" name="address" id="address" {...register('address')} />
                </div>

                <div className="input-holder col-3">
                    <label htmlFor="city">Град/Село</label>
                    <input type="text" name="city" id="city" {...register('city')}/>
                </div>

                <div className="input-holder col-6">
                    <label htmlFor="country">Държава</label>
                    <input type="text" name="country" id="country" {...register('country')}/>
                </div>

                <h4>Допълнителна информация</h4>
                <div className="input-holder col-3">
                    <label htmlFor="email">Е-майл</label>
                    <input type="text" name="email" id="email" {...register('email')}/>
                </div>

                <div className="input-holder col-3">
                    <label htmlFor="phoneNumber">Телефон</label>
                    <input type="text" name="phoneNumber" id="phoneNumber" {...register('phoneNumber')}/>
                </div>

                <div className="input-holder col-3">
                    <label htmlFor="webSite">Уебсайт</label>
                    <input type="text" name="webSite" id="webSite" {...register('webSite')}/>
                </div>

                <div className="add-clients-buttons-holder">
                    <button className="create-client-button" >Запис</button>
                    <button>Отказ</button>
                </div>
            </form>
        </div>
    )
}