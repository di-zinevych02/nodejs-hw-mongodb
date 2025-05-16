import { getAllContacts, getContactById } from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
    });
};
export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
        //створюємо та налаштовуємо помилку
        throw createHttpError(404, 'Contact not found');
    }
    // замість   if (!contact) {
    //             res.status(404).json({
    //                 message: 'Contact not found'
    //             });
    //                 return;
    //         }
        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });
    };

