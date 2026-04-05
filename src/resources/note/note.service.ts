import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const noteService = {
  async list(userId: string) {
    return prisma.note.findMany({ where: { userId } });
  },

  async getOne(id: string, userId: string) {
    const note = await prisma.note.findFirst({ where: { id, userId } });
    if (!note) throw new Error('NOT_FOUND');
    return note;
  },

  async create(userId: string, data: { title: string, content: string }) {
    return prisma.note.create({ data: { ...data, userId } });
  },

  async update(id: string, userId: string, data: any) {
    // Verifica existência/pertença antes de atualizar
    await this.getOne(id, userId); 
    return prisma.note.update({ where: { id }, data });
  },

  async delete(id: string, userId: string) {
    await this.getOne(id, userId);
    return prisma.note.delete({ where: { id } });
  }
};
