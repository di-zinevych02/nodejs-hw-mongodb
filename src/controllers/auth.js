import { registerUser } from "../services/auth.js";
import { logoutUser } from '../services/auth.js';
import { ONE_DAY } from '../constants/index.js';
import {loginUser} from "../services/auth.js";
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