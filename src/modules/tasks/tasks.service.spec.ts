import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { TasksRepository } from './tasks.repository';
import { PrismaService } from '../../db/prisma.service';

describe('TasksRepository', () => {
  let tasksRepository: TasksRepository;
  let prismaMock: DeepMockProxy<PrismaService>;

  beforeEach(() => {
    prismaMock = mockDeep<PrismaService>();
    tasksRepository = new TasksRepository(prismaMock);
  });

  it('should get all tasks with pagination', async () => {
    prismaMock.tasks.findMany.mockResolvedValue([{ id: 1 } as any]);
    prismaMock.tasks.count.mockResolvedValue(10);

    const result = await tasksRepository.getAll(1, 5);

    expect(result).toEqual({
      tasks: [{ id: 1 }],
      pagination: {
        total: 10,
        page: 1,
        pageSize: 5,
        totalPages: 2,
      },
    });
  });

  it('should get one task by id', async () => {
    prismaMock.tasks.findUnique.mockResolvedValue({ id: 1 } as any);

    const result = await tasksRepository.getOneById(1);

    expect(result).toEqual({ id: 1 });
  });

  it('should create a task', async () => {
    const task = {
      id: 1,
      titulo: 'Test Task',
      descricao: 'Some description',
      status: 'pending',
      dataCriacao: new Date(),
      dataConclusao: null,
    };

    prismaMock.tasks.create.mockResolvedValue(task);

    const result = await tasksRepository.create(task);

    expect(result).toEqual(task);
  });

  it('should update a task', async () => {
    const task = {
      id: 1,
      titulo: 'Updated Title',
      descricao: 'Updated Desc',
      status: 'done',
      dataCriacao: new Date(),
      dataConclusao: new Date(),
    };

    prismaMock.tasks.update.mockResolvedValue(task);

    const result = await tasksRepository.update(task);

    expect(result).toEqual(task);
  });

  it('should delete a task', async () => {
    prismaMock.tasks.delete.mockResolvedValue({ id: 1 } as any);

    const result = await tasksRepository.delete(1);

    expect(result).toEqual({ id: 1 });
  });
});
