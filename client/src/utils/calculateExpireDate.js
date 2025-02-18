import formatDate from "./formatDate";

function calculateExpireDate(date, paymentTerm) {

    const reformed_date = date.split(".");
    const expirationDate = new Date(reformed_date[2] + "-" + reformed_date[1] + "-" + reformed_date[0]);
    expirationDate.setDate(expirationDate.getDate() + parseInt(paymentTerm));
    const reformed_expireDate = formatDate(expirationDate);

    return reformed_expireDate;
};

export default calculateExpireDate;