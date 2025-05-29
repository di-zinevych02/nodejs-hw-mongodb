import { ContactsCollection } from "../models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/index.js";
export const getAllContacts = async ({
    page = 1,
    perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {

    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find();
    const contactsCount = await ContactsCollection.find().merge(contactsQuery).countDocuments();
    const contacts = await contactsQuery.skip(skip).limit(limit).exec();
    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    return {
        data: contacts,
        ...paginationData,
    };
};
export const getContactById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
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
export const deleteContact = async (contactId) => {
    const contact = await ContactsCollection.findByIdAndDelete(contactId);
    return contact;
};