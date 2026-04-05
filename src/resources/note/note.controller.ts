import { Request, Response } from 'express';
import { noteService } from './note.service';

export const noteController = {
  async index(req: Request, res: Response) {
    const notes = await noteService.list(req.session.userId!);
    res.json(notes);
  },

  async show(req: Request, res: Response) {
    try {
      const note = await noteService.getOne(req.params.id, req.session.userId!);
      res.json(note);
    } catch (e) {
      res.status(404).json({ msg: "Nota não encontrada ou não pertence ao usuário" });
    }
  },

  async create(req: Request, res: Response) {
    const note = await noteService.create(req.session.userId!, req.body);
    res.status(201).json(note);
  },

  async update(req: Request, res: Response) {
    try {
      const note = await noteService.update(req.params.id, req.session.userId!, req.body);
      res.json(note);
    } catch (e) {
      res.status(404).json({ msg: "Nota não encontrada ou não pertence ao usuário" });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      await noteService.delete(req.params.id, req.session.userId!);
      res.status(204).send();
    } catch (e) {
      res.status(404).json({ msg: "Nota não encontrada ou não pertence ao usuário" });
    }
  }
};
