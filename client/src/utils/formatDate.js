function formatDate(date) {
    if (typeof date === "string") {
        const splitedDate = date.split(".");
        const day = parseInt(splitedDate[0], 10);
        const month = parseInt(splitedDate[1], 10) - 1;
        const year = parseInt(splitedDate[2], 10);
        date = new Date(year, month, day);
    }
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = String(date.getFullYear());

    return `${day}.${month}.${year}`;
}

export default formatDate;