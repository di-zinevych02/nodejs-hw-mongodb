import { HttpError} from 'http-errors';

export const errorHandler = (err, req, res, next) => {
    //перевірка чи отримали помилку від createHttpError, дає можливість працювати з помилками створеними за допомогою  бібліотеки
    if (err instanceof HttpError) {
        res.status(err.status).json({
            status: err.status,
            message: err.name,
            data: err,
        });
        return;
    }
        res.status(500).json({
message: 'Something went wrong',
            error: err.message,
    });
};