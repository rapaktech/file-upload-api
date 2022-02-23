import express from 'express';
import { decodeToken } from './../services/jwt';

export const checkIfUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(400).json({ message: "Token Missing. Please Sign In Again To Access This Page." });

        const decodedToken = decodeToken(token);
        if (!decodedToken) return res.status(400).json({ message: "Session Expired. Please Sign In Again To Access This Page." });

        req.body.user = decodedToken;
        next();
    } catch (error) {
        next(error);
    }
}