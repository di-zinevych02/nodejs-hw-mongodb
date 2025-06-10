import { registerUser } from "../services/auth.js";
import { logoutUser } from '../services/auth.js';
import { ONE_DAY } from '../constants/index.js';
import { loginUser } from "../services/auth.js";
import { refreshUsersSession } from '../services/auth.js';
import { requestResetToken } from '../services/auth.js';

import { resetPassword } from '../services/auth.js';
export const registerUserController = async (req, res) => {
    const user = await registerUser(req.body);
    res.status(201).json({
        status: 201,
        message: 'Successfully registered a user!',
        data: user,
    });
};
export const loginUserController = async (req, res) => {
    const session = await loginUser(req.body);
    res.cookie('refreshToken', session.refreshToken, {
        //Це флаг безпеки.

//Якщо true, cookie не доступна з JavaScript на клієнті (document.cookie).

//Це допомагає захистити токен від XSS-атак (скрипти не можуть прочитати токен).
        httpOnly: true,
        //Це дата, коли cookie автоматично закінчується (видаляється).
        expires: new Date(Date.now() + ONE_DAY),
        //ONE_DAY — змінна, яка ймовірно містить кількість мілісекунд у добі, тобто 24 * 60 * 60 * 1000 = 86400000.
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
    res.json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: {
            accessToken: session.accessToken,
        },
    });
};
//виконує процес обробки запиту на вихід користувача і взаємодію з клієнтом через HTTP
export const logoutUserController = async (req, res) => {
    if (req.cookies.sessionId) {
        await logoutUser(req.cookies.sessionId);
    }
    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(204).send();
};

//refreshToken зберігається як http-only cookie, що означає,
//  що він доступний тільки через HTTP-запити і не може бути доступним через JavaScript на стороні клієнта. 
// Він має термін дії один день.
const setupSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
};
//виконує процес оновлення сесії користувача і взаємодію з клієнтом через HTTP
export const refreshUserSessionController = async (req, res) => {
    //refreshUsersSession виконує процес оновлення сесії і повертає об'єкт нової сесії.
    const session = await refreshUsersSession({
        sessionId: req.cookies.sessionId,
        refreshToken: req.cookies.refreshToken,

    });
    setupSession(res, session);
    res.json({
        status: 200,
        message: 'Successfully refreshed a session!',
        data: {
            accessToken: session.accessToken,
        },
    });
};
//Таким чином, функція refreshUserSessionController обробляє HTTP-запит на оновлення сесії користувача, 
// викликає функцію для оновлення сесії refreshUsersSession, встановлює нові куки для збереження токенів та ідентифікатора сесії, 
// і відправляє клієнту відповідь з інформацією про успішне оновлення сесії та новим токеном доступу.

export const requestResetEmailController = async (req, res) => {
    await requestResetToken(req.body.email);
    res.json({
        message: "Reset password email was successfully sent!",
        status: 200,
        data: {},
    });
};
export const resetPasswordController = async (req, res) => {
    await resetPassword(req.body);
    res.json({
        message: 'Password was successfully reset!',
        status: 200,
        data: {},
    });
};