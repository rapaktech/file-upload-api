import aws from 'aws-sdk';

const s3Instance = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION
}), bucket = String(process.env.S3_BUCKET);

export { s3Instance, bucket };