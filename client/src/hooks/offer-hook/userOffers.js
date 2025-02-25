import { useEffect, useState } from "react";

import { offerService } from "../../api/offer-api.js";

export function useGetAllOffers() {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await offerService.getAllOffers();
            setOffers(result);
        })();
    }, []);

    return offers;
};

export function useGetOneOffer(offerId) {
    const [offer, setOffer] = useState({});

    useEffect(() => {
        (async () => {
            const result = await offerService.getOneOffer(offerId);
            setOffer(result);
        })();
    }, [])

    return offer;
}