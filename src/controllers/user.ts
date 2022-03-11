import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { validationResult } from 'express-validator';
import express from 'express';
import { hashPassword, verifyPassword } from './../services/bcrypt';
import { signToken } from './../services/jwt';


export const createUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(errors);
    }

    const foundUser = await prisma.user.findUnique({
        where: { email: req.body.email },
    });

    if (foundUser) return res.status(400).json({ message: 'Email Has Been Used Before!' });

    const hash = await hashPassword(req.body.password);

    const newUser = await prisma.user.create({
        data: {
          fullName: req.body.fullName,
          email: req.body.email,
          password: hash       
        },
    });

    if (newUser) return res.status(200).json({ message: 'User Created Successfully!' });
    else next();
}


export const loginUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(errors);
    }

    const foundUser = await prisma.user.findUnique({
        where: { email: req.body.email },
    });

    if (!foundUser) return res.status(400).json({ message: 'Invalid Email Address Or Password' });

    const isValidPassword = await verifyPassword(req.body.password, foundUser?.password);

    if (isValidPassword) {
        const token = signToken({ id: foundUser.id, email: foundUser.email });
        return res.status(200).json({ message: `User Logged In Successfully! Here's Your Token:`, token });
    }
    else return res.status(400).json({ message: 'Invalid Email Address Or Password' });
}