import { Router } from 'express';
import { noteController } from './note.controller';
import { isAuth } from '../../middlewares/isAuth';
import { validateBody } from '../../middlewares/validateBody';
import { noteSchema } from './note.schema';

const noteRouter = Router();

// Todas as rotas de notas requerem sessão ativa
noteRouter.use(isAuth);

// GET /v1/notes - Listar todas
noteRouter.get('/', noteController.index);

// POST /v1/notes - Criar nova
noteRouter.post('/', validateBody(noteSchema), noteController.create);

// GET /v1/notes/:id - Ver específica
noteRouter.get('/:id', noteController.show);

// PUT /v1/notes/:id - Atualizar
noteRouter.put('/:id', validateBody(noteSchema), noteController.update);

// DELETE /v1/notes/:id - Remover
noteRouter.delete('/:id', noteController.remove);

export { noteRouter };
