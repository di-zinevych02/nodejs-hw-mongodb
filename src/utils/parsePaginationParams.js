//Функція parseNumber призначена для перетворення рядкових значень в числа
const parseNumber = (number, defaultValue) => {
    //функція перевіряє, чи є передане значення рядком.
    const isString = typeof number === 'string';
    // Якщо це не так, вона одразу повертає значення за замовчуванням. 
    if (!isString) return defaultValue;
    //Якщо ж значення є рядком, вона спробує перетворити його на число.
    const parsedNumber = parseInt(number);
    //Якщо результат перетворення є NaN (не число), повертається значення за замовчуванням.
    if (Number.isNaN(parsedNumber)) {
        return defaultValue;
    }
    //У випадку успішного перетворення, функція повертає це число.
    return parsedNumber;
};
//Функція parsePaginationParams використовує parseNumber для обробки пагінаційних параметрів, 
// які зазвичай надходять у запитах до бекенду. 
// Ці параметри, page і perPage, містяться в об'єкті query і можуть бути неправильно вказані або взагалі пропущені.
export const parsePaginationParams = (query) => {
    //Функція спершу витягує ці параметри, а потім використовує parseNumber для їх валідації та конвертації, 
    const { page, perPage } = query;
        // зі значеннями за замовчуванням 1 для page і 10 для perPage.
    const parsedPage = parseNumber(page, 1);
    const parsedPerPage = parseNumber(perPage, 10);
//Кінцевим результатом є об'єкт з коректно обробленими і валідними пагінаційними параметрами.
    return {
        page: parsedPage,
        perPage: parsedPerPage,
    };

};