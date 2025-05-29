import { SORT_ORDER } from "../constants/index.js";
//Цей парсер використовується для обробки та стандартизації параметрів сортування, 
// які можуть бути вказані у запиті до сервера. 

//Функція parseSortOrder приймає параметр sortOrder та перевіряє, чи відповідає він одному з відомих порядків сортування — 
// або зростанню (ASC), або спаданню (DESC). 
// Якщо вказаний порядок сортування входить до цього списку, функція повертає його.

const parseSortOrder = (sortOrder) => {
        const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
    if (isKnownOrder) return sortOrder;
     //  Якщо порядок сортування не відомий або відсутній, за замовчуванням функція встановлює порядок сортування на зростання (ASC).
        return SORT_ORDER.ASC;
};
    
//Функція parseSortBy приймає параметр sortBy, який має вказувати поле, 
// за яким потрібно виконати сортування в базі даних студентів. 
// Вона перевіряє, чи входить дане поле до списку допустимих полів. 

const parseSortBy = (sortBy) => {
    const keysOfContact = [
        '_id', 'name', 'phoneNumber', 'email', 'isFavourite', 'contactType', 'createdAt',
    'updatedAt',
    ];
    ////Якщо поле входить до цього списку, вона повертає його.
    if (keysOfContact.includes(sortBy)) {
        return sortBy;
    }
    //Якщо ж ні — за замовчуванням повертається поле _id.
    return "_id";

};

// функція parseSortParams, яка експортується з модуля, інтегрує обидві ці функції.
//  Вона приймає об'єкт query, з якого витягує значення sortOrder та sortBy,

export const parseSortParams = (query) => {
    const { sortOrder, sortBy } = query;
    const parsedSortOrder = parseSortOrder(sortOrder);
    const parsedSortBy = parseSortBy(sortBy);
    ////  передає їх на обробку у відповідні функції та повертає об'єкт із валідованими та готовими до використання параметрами для сортування. 
    return {
        sortOrder: parsedSortOrder,
        sortBy: parsedSortBy,
    };
};
// Це дозволяє забезпечити консистентність і надійність обробки запитів сортування, забезпечуючи, що сервер завжди працює з коректними та очікуваними даними.