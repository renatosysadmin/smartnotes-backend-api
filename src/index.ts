import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { v1Router } from './router/v1Router';

dotenv.config();
const app = express();

// Segurança
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// Rate Limiting Global
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(globalLimiter);

// Configuração de Sessão
app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  }
}));

app.use('/v1', v1Router);

app.listen(3333, () => console.log("Server running on port 3333"));
