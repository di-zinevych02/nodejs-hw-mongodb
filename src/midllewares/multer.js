import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, TEMP_UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        //для того, щоб можна було завантажити фото не перетираючи інше, якщо фото з однаковою назвою завантажуємо
        cb(null, `${uniqueSuffix}_${file.originalname}`);
    },
});
export const upload = multer({ storage });