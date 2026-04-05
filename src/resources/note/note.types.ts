import { Note } from '@prisma/client';

/**
 * Tipo para a criação de uma nota.
 * O 'userId', 'id', 'createdAt' e 'updatedAt' são gerados 
 * automaticamente ou pelo sistema, então não vêm no body da requisição.
 */
export type CreateNoteData = Pick<Note, 'title' | 'content'>;

/**
 * Tipo para a atualização de uma nota.
 * O Partial torna os campos opcionais, permitindo atualizar 
 * apenas o título ou apenas o conteúdo se necessário.
 */
export type UpdateNoteData = Partial<CreateNoteData>;

/**
 * Interface que representa o objeto da nota como 
 * ele deve ser retornado para o frontend.
 */
export interface NoteResponse extends Note {}
