import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryResolver } from './history.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from '../../entities/History.entity';

@Module({
  imports: [TypeOrmModule.forFeature([History])],
  providers: [HistoryResolver, HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
