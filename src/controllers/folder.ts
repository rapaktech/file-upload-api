import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { validationResult } from 'express-validator';
import express from 'express';

export const createFolder = async (req: any, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(errors);
    }

    const newFolder = await prisma.folder.create({
        data: {
          name: req.body.name,
          user: { connect: { email: req.body.user.email } },
        },
    });

    if (!newFolder) next();
    else return res.status(200).json({ message: 'Folder Created Successfully!' });
}