import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
 
//фунція bootstrap, яка буде ініціалізувати підключення до бази даних, після чого запускати сервер.
const bootstrap = async () => {
    await initMongoConnection();
    setupServer();
};
bootstrap();
