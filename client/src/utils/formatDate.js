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

export function formatDateFromReactDatePicker(date) {
    const day = String(date.getDate()).padStart(2, '0');  // Get day and ensure it's 2 digits (e.g. "02")
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Get month (0-11, so add 1)
    const year = date.getFullYear();  // Get the full year (e.g. "2025")

    return `${day}.${month}.${year}`;  // Format it as dd/MM/yyyy
}

export default formatDate;