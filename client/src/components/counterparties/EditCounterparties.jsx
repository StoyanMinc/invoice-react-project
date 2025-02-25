import { useNavigate, useParams } from "react-router-dom"
import { useGetOneClient } from "../../hooks/client-hook/useClients";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { clientService } from "../../api/client-api";

export default function EditCounterparties() {
    const navigate = useNavigate();
    const { clientId } = useParams();
    const client = useGetOneClient(clientId);

    const {register, handleSubmit, setValue} = useForm({
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

    useEffect(() => {
        if(client) {
            setValue('typeOfClinet', client.typeOfClinet);
            setValue('nameOfClient', client.nameOfClient);
            setValue('mol', client.mol);
            setValue('eikEgn', client.eikEgn);
            setValue('identN', client.identN);
            setValue('address', client.address);
            setValue('city', client.city);
            setValue('country', client.country);
            setValue('email', client.email);
            setValue('phoneNumber', client.phoneNumber);
            setValue('webSite', client.webSite);
        }
    }, [client]);


     const submitHandlder = async (values) => {
            try {
                const updatedClient = await clientService.updateClient(client._id, values);
                console.log(updatedClient);
                navigate('/counterparties');
                
            } catch (error) {
                console.log(error.message);
            }
        }

    return (
        <div className="add-counterparties-form-container">
            <h3>Редактиране на клиент</h3>

            <form action="POST" className="add-counterparties-form" onSubmit={handleSubmit(submitHandlder)}>
                <h4>Основна информация</h4>

                <div className="input-holder col-3">
                    <label htmlFor="typeOfClient">Тип клиент</label>
                    <select name="typeOfClinet" id="typeOfClient" {...register('typeOfClinet')}>
                        <option value="фирма">Фирма</option>
                        <option value="частно лице">Частно лице</option>
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
                    <button className="create-client-button" >Редактирай</button>
                    <button>Отказ</button>
                </div>
            </form>
        </div>
    )
}