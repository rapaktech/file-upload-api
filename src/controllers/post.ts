import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { validationResult } from 'express-validator';
import express from 'express';
import { s3Instance } from './../utilities/s3';
import fs from 'fs';
import path from 'path';

export const createPost = async (req: any, res: express.Response, next: express.NextFunction) => {
    try {
        const fileExtension = req.file.originalname.split('.')[1];
        const filePath = `${req.file.destination}${req.file.filename}`;
        const absoluteFilePath = path.normalize(filePath);

        const fileStream = fs.createReadStream(absoluteFilePath);
        fileStream.on('error', function (error) {
            console.log("File Error", error);
        });

        let contentType = 'application/octet-stream';
        if (fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'gif') contentType = "image/" + fileExtension;
        if (fileExtension == 'mpeg') contentType = "video/" + fileExtension;

        const uploadParams = {
            Bucket: String(process.env.S3_BUCKET),
            Key: `${Date.now().toString()}.${fileExtension}`,
            Body: fileStream,
            ContentType: contentType,
        }

        s3Instance.upload(uploadParams, async function (err: any, data: any) {
            fs.unlink(absoluteFilePath, (err) => {
                if (err) console.log(err);
            });

            const newPost = await prisma.post.create({
                data: {
                    title: req.body.title,
                    content: data.Location,
                    user: {
                        connect: {
                            email: req.body.user.email
                        }
                    }
                }
            });

            if (newPost) return res.status(200).json({ message: 'Post Created Successfully!', newPost });
        });
    } catch (error) {
        next(error);
    }
}

export const getPost = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(errors);
    }

    const foundPost = await prisma.post.findUnique({
        where: { id: Number(req.body.fileId) },
    });

    if (!foundPost) return res.status(400).json({ message: 'File Not Found!' });
    else return res.status(200).json({ message: `Here's Your File: `, foundPost });
}