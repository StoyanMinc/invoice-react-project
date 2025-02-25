import { Link, useNavigate } from "react-router-dom";
import { offerService } from "../../../api/offer-api";

export default function OfferItem({ offer }) {

const navigate = useNavigate();
    const deleteOfferHandler = async (offerId) => {
        try {
            await offerService.deleteOffer(offerId);
            navigate('/documents/offers');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <tr>
            <td><input type="checkbox" /></td>
            <td>{offer.offerDate}</td>
            <td>{offer.title}</td>
            <td>{offer.client.nameOfClient}</td>
            <td>{offer.totalPrice.toFixed(2)} лв.</td>
            <td>{offer.offerType}</td>
            <td>отказана</td>
            <td>
                <Link to={'/'} className="action-icon tick-icon"></Link>
                <Link to={'/'} className="action-icon traffic-icon"></Link>
                <Link to={`/documents/offers/${offer._id}/edit`} className="action-icon edit-icon"></Link>
                <Link className="action-icon print-icon"></Link>
                <button to={'/'} className="action-icon bin-icon" onClick={() => deleteOfferHandler(offer._id)}></button>
            </td>
        </tr>
    )
}