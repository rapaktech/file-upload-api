import bcrypt from 'bcrypt';
const saltRounds = Number(process.env.SALT_ROUNDS);

export const hashPassword = async (unhashedPassword: any) => {
    const hash = await bcrypt.hash(unhashedPassword, saltRounds);
    return hash;
}

export const verifyPassword = async (password: any, hash: any) => {
    const isValidPassword = await bcrypt.compare(password, hash);
    return isValidPassword;
}