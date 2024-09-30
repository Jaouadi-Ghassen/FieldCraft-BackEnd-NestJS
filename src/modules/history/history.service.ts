import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from '../../entities/History.entity';
import { Repository } from 'typeorm';
import { CreateHistoryDto } from './dto/createHistory.dto';
import {
  ProjectState,
  ProjectStateOrder,
} from '../../utils/enum/projectState.enum';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
  ) {}

  async findAll(): Promise<History[]> {
    return await this.historyRepository.find();
  }

  async findHistoryById(id: string): Promise<History | null> {
    const history = await this.historyRepository.findOne({ where: { id } });
    if (!history) {
      throw new NotFoundException('History not found');
    }
    return history;
  }

  async findAllHistoryForProjectById(projectId: string): Promise<History[]> {
    const histories = await this.historyRepository.find({
      where: { projectId },
      order: { createdAt: 'DESC' },
    });

    const latestHistoriesByState: { [key: string]: History } = {};

    for (const state of ProjectStateOrder) {
      const latestHistoryForState = histories.find(
        (history) => history.state === state,
      );
      if (latestHistoryForState) {
        latestHistoriesByState[state] = latestHistoryForState;
      }
    }

    return Object.values(latestHistoriesByState);
  }

  async findStateByProjectId(id: string): Promise<ProjectState | null> {
    const history = await this.historyRepository.findOne({
      where: { projectId: id },
      order: { createdAt: 'DESC' },
    });
    if (!history) {
      return null;
    }
    return history.state;
  }

  async createHistory(createHistoryDto: CreateHistoryDto): Promise<History> {
    const history = this.historyRepository.create(createHistoryDto);
    return this.historyRepository.save(history);
  }

  async updateHistory(
    id: string,
    updatedHistory: Partial<History>,
  ): Promise<History> {
    const history = await this.findHistoryById(id);
    if (!history) {
      throw new NotFoundException('History not found');
    }
    Object.assign(history, updatedHistory);
    return this.historyRepository.save(history);
  }

  async deleteHistory(id: string): Promise<void> {
    const history = await this.findHistoryById(id);
    if (!history) {
      throw new NotFoundException('History not found');
    }
    await this.historyRepository.delete(id);
  }
}
