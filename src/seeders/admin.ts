import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { hashPassword } from './../services/bcrypt';

export const createAdmin = async () => {
    try {
        const foundAdmin = await prisma.admin.findUnique({
            where: { email: process.env.ADMIN_EMAIL },
        });
    
        if (foundAdmin) return console.log('Admin Already Exists!');
    
        const hash = await hashPassword(String(process.env.ADMIN_PASSWORD));
    
        const newAdmin = await prisma.admin.create({
            data: {
              fullName: String(process.env.ADMIN_FULLNAME),
              email: String(process.env.ADMIN_EMAIL),
              password: hash       
            },
        });
    
        if (newAdmin) return console.log('Admin Created Successfully!');
    } catch (error) {
        throw error;
    }
}