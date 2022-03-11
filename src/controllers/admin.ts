import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { validationResult } from 'express-validator';
import express from 'express';
import { verifyPassword } from './../services/bcrypt';
import { signToken } from './../services/jwt';

export const loginAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(errors);
    }

    const foundAdmin = await prisma.admin.findUnique({
        where: { email: req.body.email },
    });

    if (!foundAdmin) return res.status(400).json({ message: 'Invalid Email Address Or Password' });

    const isValidPassword = await verifyPassword(req.body.password, foundAdmin?.password);

    if (isValidPassword) {
        const token = signToken({ id: foundAdmin.id, email: foundAdmin.email });
        return res.status(200).json({ message: `Admin Logged In Successfully! Here's Your Token:`, token });
    }
    else return res.status(400).json({ message: 'Invalid Email Address Or Password' });
}

export const markUnsafe = async (req: any, res: express.Response, next: express.NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next(errors);
        }
        const post = await prisma.post.delete({
            where: {
                id: Number(req.body.fileId),
            }
        });
        return res.status(200).json({ message: 'Post Deleted Successfully!', post });
    } catch (error) {
        next(error);
    }
}