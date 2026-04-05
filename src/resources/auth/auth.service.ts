import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import { SignupData, LoginData } from './auth.types';

const prisma = new PrismaClient();
const DUMMY_HASH = bcryptjs.hashSync("dummy_password", 10); // Para timing attack

export const authService = {
  async signup(data: SignupData) {
    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) throw new Error('EMAIL_EXISTS');

    const hashedPassword = await bcryptjs.hash(data.password, 10);
    const user = await prisma.user.create({
      data: { ...data, password: hashedPassword }
    });
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  async login({ email, password }: LoginData) {
    const user = await prisma.user.findUnique({ where: { email } });
    
    // Proteção contra Timing Attack: sempre executa o compare
    const isValid = await bcryptjs.compare(password, user ? user.password : DUMMY_HASH);

    if (!user || !isValid) throw new Error('INVALID_CREDENTIALS');
    return user.id;
  }
};
