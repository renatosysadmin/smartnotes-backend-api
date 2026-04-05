import { User } from '@prisma/client';

// Dados necessários para criar um novo usuário (Signup)
// Usamos o Pick para garantir que venha exatamente o que o banco espera
export type SignupData = Pick<User, 'email' | 'fullname' | 'password'>;

// Dados necessários para o Login
export type LoginData = Pick<User, 'email' | 'password'>;

// Tipo para a resposta do usuário (omitindo a senha por segurança)
export type UserResponse = Omit<User, 'password'>;
