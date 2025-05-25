import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import ITask from './tasks.entity';

@Controller('tarefas')
export class TasksController {
  constructor(private repo: TasksRepository) {}

  @Post('/')
  async create(@Body() task: ITask) {
    try {
      const { titulo, status, dataCriacao } = task;

      if (!titulo || !status || !dataCriacao) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'Título, status e data de criação são obrigatórios',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const novoTask = await this.repo.create(task);
      return {
        status: HttpStatus.CREATED,
        message: 'Tarefa criada com sucesso!',
        data: novoTask,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Falha ao criar tarefa.',
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/')
  async getAll(
    @Query('page') page: string = '0',
    @Query('pageSize') pageSize: string = '0',
  ) {
    try {
      const pageNumber = parseInt(page);
      const sizeNumber = parseInt(pageSize);
      const tasks = await this.repo.getAll(pageNumber, sizeNumber);

      return {
        status: HttpStatus.OK,
        message: 'Todas as tarefas obtidas com sucesso.',
        data: tasks,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Falha ao obter tarefas.',
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/:id')
  async getOneById(@Param('id') id: string) {
    try {
      const task = await this.repo.getOneById(+id);

      if (!task) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Tarefa não encontrada.',
          data: null,
        };
      }

      return {
        status: HttpStatus.OK,
        message: 'Tarefa obtida com sucesso.',
        data: task,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Falha ao obter tarefa.',
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('/:id')
  async update(@Body() task: ITask, @Param('id') id: string) {
    const idNumber = parseInt(id);
    try {
      if (!idNumber || !task.titulo || !task.status || !task.dataCriacao) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'ID, título, status e data de criação são obrigatórios',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const updatedTask = await this.repo.update(task, idNumber);
      return {
        status: HttpStatus.OK,
        message: 'Tarefa atualizada com sucesso.',
        data: updatedTask,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Falha ao atualizar tarefa.',
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    try {
      const deletedTask = await this.repo.delete(+id);
      return {
        status: HttpStatus.OK,
        message: 'Tarefa deletada com sucesso.',
        data: deletedTask,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Falha ao deletar tarefa.',
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
