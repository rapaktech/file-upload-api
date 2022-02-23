import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { validationResult } from 'express-validator';
import express from 'express';
import { uploadFile } from './../utilities/multer';

export const upload = uploadFile.single('file');

export const createPost = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const newPost = await prisma.post.create({
            data: {
                title: req.body.title,
                content: req.file.location,
                user: {
                    connect: {
                        email: req.body.user.email
                    }
                }
            }
        });

        return res.status(200).json({ message: 'Post Created Successfully!', newPost });
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