import createHttpError from 'http-errors';
import { SessionsCollection } from '../models/session.js';
import { UsersCollection } from '../models/user.js';
//виконує процес аутентифікації користувача, перевіряючи наявність та дійсність токена доступу в заголовку запиту.
export const authenticate = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        next(createHttpError(401, 'Please provide Authorization header'));
        return;
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    //Функція розділяє заголовок авторизації на дві частини: тип (повинен бути "Bearer") і сам токен.
    if (bearer !== 'Bearer' || !token) {
        next(createHttpError(401, 'Auth header should be of type Bearer'));
        return;
    }
    //Функція шукає сесію в колекції SessionsCollection за наданим токеном доступу.
    const session = await SessionsCollection.findOne({ accessToken: token });
    if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
    }
    //Функція перевіряє, чи не минув термін дії токена доступу, порівнюючи поточну дату з датою закінчення дії токена.
    const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
  }
    //Функція шукає користувача в колекції UsersCollection за ідентифікатором користувача, який зберігається в сесії.
    const user = await UsersCollection.findById(session.userId);
    if (!user) {
        next(createHttpError(401));
    return;
    }
    // Якщо всі перевірки успішні, функція додає об'єкт користувача до запиту (req.user = user).
    req.user = user;
    //Викликається наступна функція за допомогою next, що дозволяє продовжити обробку запиту.
    next();
};