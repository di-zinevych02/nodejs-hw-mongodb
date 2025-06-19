import cookieParser from 'cookie-parser';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './/midllewares/errorHandler.js';
import { notFoundHandler } from './/midllewares/notFoundHandler.js';
import router from './routers/index.js';


// Читаємо змінну оточення PORT
const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = async () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());
    app.use(
        //це опція, яка дозволяє визначити, як виводити логи.
        //target: 'pino-pretty' означає, що Pino не буде виводити JSON-логи (за замовчуванням), а використовуватиме більш читабельний формат для розробки.
        pino({
            transport: {
                target: 'pino-pretty',

            },
        }),
    );
    app.use(router);
    app.use(notFoundHandler);
    app.use(errorHandler);
    
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
};
