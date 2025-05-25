import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import ITask from './tasks.entity';

@Injectable()
export class TasksRepository {
  constructor(private prismaService: PrismaService) {}

  // CRUD

  async getAll(page: number, pageSize: number) {
    if (!page || !pageSize) {
      const tasks = await this.prismaService.tasks.findMany({
        orderBy: {
          dataCriacao: 'desc',
        },
      });

      return {
        tasks,
      };
    } else {
      const skip = (page - 1) * pageSize;
      const take = pageSize;

      const tasks = await this.prismaService.tasks.findMany({
        skip,
        take,
        orderBy: {
          dataCriacao: 'desc',
        },
      });

      const total = await this.prismaService.tasks.count();

      return {
        tasks,
        pagination: {
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      };
    }
  }

  async getOneById(id: number) {
    return this.prismaService.tasks.findUnique({
      where: {
        id,
      },
    });
  }

  async create(task: ITask) {
    return this.prismaService.tasks.create({
      data: {
        titulo: task.titulo,
        descricao: task.descricao,
        status: task.status,
        dataCriacao: task.dataCriacao,
        dataConclusao: task.dataConclusao,
      },
    });
  }

  async update(task: ITask, id: number) {
    return this.prismaService.tasks.update({
      where: {
        id: id,
      },
      data: {
        titulo: task.titulo,
        descricao: task.descricao,
        status: task.status,
        dataCriacao: task.dataCriacao,
        dataConclusao: task.dataConclusao,
      },
    });
  }

  async delete(id: number) {
    return this.prismaService.tasks.delete({
      where: {
        id,
      },
    });
  }
}
