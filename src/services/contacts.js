import { ContactsCollection } from "../models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/index.js";
export const getAllContacts = async ({
    page = 1,
    perPage = 10,
  sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {},
  userId,
}) => {

    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find({ userId });
//оператор порівняння equals повертає документи, де значення поля дорівнює заданому значеню isFavourite
    if (filter.isFavourite) {
        contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }
    if (filter.contactType) {
        contactsQuery.where('contactType').equals(filter.contactType);

    }

    
    //const contactsCount = await ContactsCollection.find().merge(contactsQuery).countDocuments();
    //const contacts = await contactsQuery.skip(skip).limit(limit).exec();
    
    const [contactsCount, contacts] = await Promise.all([
        ContactsCollection.find().merge(contactsQuery).countDocuments(),
        contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec(),
    ]); 
//У  цій рефакторингованій версії коду, замість послідовного виконання, обидві операції запускаються одночасно.
//  Promise.all приймає масив промісів і повертає новий проміс, який виконується, коли всі проміси в масиві успішно виконані. 
// Результатом є масив результатів кожного з промісів у тому порядку, в якому вони були передані.
        const paginationData = calculatePaginationData(contactsCount, perPage, page);
    return {
        data: contacts,
        ...paginationData,
    };
};
export const getContactById = async (contactId, userId) => {
    const contact = await ContactsCollection.findOne({ _id: contactId, userId });
    return contact;
};
//Метод find() моделі ContactsCollection — це вбудований метод Mongoose для пошуку документів у MongoDB. 
// Викликаючи find() на моделі ContactsCollection, ми отримаємо масив документів, що відповідають моделі Contact. 
// У випадку, якщо колекція контактів порожня, метод повертає порожній масив

//Метод findById() моделі ContactsCollection — це вбудований метод Mongoose для пошуку одного документа у MongoDB за його унікальним ідентифікатором. 
// Викликаючи findById() на моделі ContactsCollection із вказаним ідентифікатором студента, ми отримаємо документ, що відповідає цьому ідентифікатору, як об'єкт Contact. 
// Якщо документ із заданим ідентифікатором не буде знайдено, метод поверне null
//Створення сервісу в файлі
export const createContact = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
};
export const updateContact = async (contactId, payload) => {
    const contact = await ContactsCollection.findByIdAndUpdate(contactId, payload, { new: true });
    return contact;
};
export const deleteContact = async (contactId, userId) => {
    const contact = await ContactsCollection.findOneAndDelete({ _id: contactId, owner: userId, });
    return contact;
};