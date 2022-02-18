import jwt from 'jsonwebtoken';
const jwtSecretKey = String(process.env.JWT_SECRET_KEY);

export const signToken = (payload: any) => {
    try {
        const token = jwt.sign(payload, jwtSecretKey);
        return token;
    } catch (error) {
        return false;
    }
}

export const decodeToken = (token: any) => {
    try {
        const decodedToken = jwt.verify(token, jwtSecretKey);
        return decodedToken;
    } catch (error) {
        return false;
    }
}