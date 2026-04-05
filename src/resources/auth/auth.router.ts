import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { authController } from './auth.controller';
import { validateBody } from '../../middlewares/validateBody';
import { signupSchema, loginSchema } from './auth.schema';
import { isAuth } from '../../middlewares/isAuth';

const authRouter = Router();

// Requisito 6.5: Rate Limit específico para autenticação
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // Limite de 10 requisições
  message: { msg: "Muitas tentativas de autenticação, tente novamente mais tarde." }
});

// Rota de Cadastro (Signup)
authRouter.post(
  '/signup', 
  authLimiter, 
  validateBody(signupSchema), 
  authController.signup
);

// Rota de Login
authRouter.post(
  '/login', 
  authLimiter, 
  validateBody(loginSchema), 
  authController.login
);

// Rota de Logout (Requisito 4.1: Rota protegida)
authRouter.post(
  '/logout', 
  isAuth, 
  authController.logout
);

export { authRouter };
