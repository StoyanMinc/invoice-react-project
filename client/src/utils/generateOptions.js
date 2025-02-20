export default function generateOptions() {
    const options = [];
    for (let day = 1; day <= 31; day++) {
        if (day === 1 || day === 21 || day === 31) {
            options.push(day + '-ви');
        } else if (day === 2 || day === 22) {
            options.push(day + '-ри')
        } else if (day === 7 || day === 8 || day === 27 || day === 28) {
            options.push(day + '-ми')
        } else {
            options.push(day + '-ти')
        }
    }

    return options;
}