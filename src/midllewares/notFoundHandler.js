// випадок коли клієнт звертається до неіснуючого маршуту
export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        message: 'Rout not found'
    });
};