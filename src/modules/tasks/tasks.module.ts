import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { Tasks } from '../../entities/Tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from '../../entities/History.entity';
import { HistoryService } from '../history/history.service';
import { Projects } from '../../entities/Project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tasks]),
    TypeOrmModule.forFeature([History]),
    TypeOrmModule.forFeature([Projects]),
  ],
  providers: [TasksResolver, TasksService, HistoryService],
  exports: [TasksService],
})
export class TasksModule {}
