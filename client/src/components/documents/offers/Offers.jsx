import { useGetAllOffers } from "../../../hooks/offer-hook/userOffers"
import OfferItem from "./OfferItem";
import { useNavigate } from "react-router-dom";

export default function Offers() {
    const navigate = useNavigate();
    const offers = useGetAllOffers();
    return (
        <div className="offers-container">
            <div className="offers-title-container">
                <h3>Оферти (3)</h3>
                <div className="offers-options">
                    <input type="text" className="offers-search" placeholder="Търсене" />
                    <button onClick={() => navigate('/documents/offers/add-offer')} className="submit-add-invoice-btn" >Създаване на фактура</button>
                </div>
            </div>

            <div className="offer-table-container">
                <table>
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>Дата</th>
                            <th>Заглавие</th>
                            <th>Клиент</th>
                            <th>Стойност</th>
                            <th>Тип</th>
                            <th>Статус</th>
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offers.map(offer => <OfferItem key={offer._id} offer={offer} />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}