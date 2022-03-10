import { decodeToken } from './../services/jwt';

export const checkIfUser = async (req: any, res: any, next: any) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(400).json({ message: "Token Missing. Please Sign In Again To Access This Page." });

        const decodedToken = decodeToken(token);
        if (!decodedToken) return res.status(400).json({ message: "Session Expired. Please Sign In Again To Access This Page." });

        req.body.admin = decodedToken;
        next();
    } catch (error) {
        next(error);
    }
}