import multer from 'multer';
import multerS3 from 'multer-s3';
import { s3Instance, bucket } from './s3';

const uploadFile = multer({
    storage: multerS3({
        s3: s3Instance,
        bucket: bucket,
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString());
        }
    })
});

export { uploadFile };