import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { DbModule } from '../../db/db.module';
import { TasksRepository } from './tasks.repository';

@Module({
  imports: [DbModule],
  controllers: [TasksController],
  providers: [TasksRepository],
})
export class TasksModule {}
