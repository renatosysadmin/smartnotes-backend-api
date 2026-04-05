import { Request, Response } from 'express';
import { authService } from './auth.service';

export const authController = {
  async signup(req: Request, res: Response) {
    try {
      const user = await authService.signup(req.body);
      res.status(201).json(user);
    } catch (e: any) {
      const status = e.message === 'EMAIL_EXISTS' ? 400 : 500;
      res.status(status).json({ msg: e.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const userId = await authService.login(req.body);
      req.session.userId = userId;
      res.status(200).json({ msg: "Usuário autenticado" });
    } catch (e) {
      res.status(401).json({ msg: "Credenciais inválidas" });
    }
  },

  async logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) return res.status(500).send();
      res.clearCookie('connect.sid');
      res.status(200).json({ msg: "Sessão encerrada" });
    });
  }
};
