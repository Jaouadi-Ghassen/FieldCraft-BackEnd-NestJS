import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from '../../entities/Tasks.entity';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { HistoryService } from '../history/history.service';
import {
  ProjectState,
  ProjectStateOrder,
} from '../../utils/enum/projectState.enum';
import { CreateTaskDto } from './dto/createTask.dto';
import { Projects } from '../../entities/Project.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private tasksRepository: Repository<Tasks>,
    private readonly historyService: HistoryService,
    @InjectRepository(Projects)
    private readonly projectsRepository: Repository<Projects>,
  ) {}

  async findAll(): Promise<Tasks[]> {
    return await this.tasksRepository.find();
  }

  async findTaskById(id: string): Promise<Tasks | null> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async findTasksByProjectId(projectId: string): Promise<Tasks[]> {
    const project = await this.projectsRepository.find({
      where: { id: projectId },
      relations: ['tasks'],
    });
    if (!project || project.length === 0) {
      throw new NotFoundException('Project not found');
    }
    return project[0].tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Tasks> {
    const existingTask = await this.tasksRepository.findOne({
      where: { taskName: createTaskDto.taskName },
    });
    if (existingTask) {
      throw new ConflictException('Task already exists');
    }
    const latestHistory = await this.historyService.findStateByProjectId(
      createTaskDto.projectId,
    );
    let comparisonResult = this.comparePhases(
      createTaskDto.taskPhase,
      latestHistory,
    );
    console.log(comparisonResult);
    if (comparisonResult < 0 && createTaskDto.resetProject) {
      await this.historyService.createHistory({
        projectId: createTaskDto.projectId,
        state: createTaskDto.taskPhase,
      });
    }

    const newTask = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(newTask);
  }

  private comparePhases(
    taskPhase: ProjectState,
    latestHistory: ProjectState,
  ): number {
    console.log(latestHistory);
    const taskPhaseIndex = this.getStateIndex(taskPhase);
    const latestHistoryIndex = this.getStateIndex(latestHistory);
    console.log(taskPhaseIndex);
    console.log(latestHistoryIndex);
    if (taskPhaseIndex < latestHistoryIndex) {
      return -1;
    } else if (taskPhaseIndex > latestHistoryIndex) {
      return 1;
    }
    return 0;
  }

  async updateTaskState(id: string, taskState: boolean): Promise<Tasks> {
    const task = await this.findTaskById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.taskState = taskState;
    const result = await this.tasksRepository.save(task);
    let currentPhase = result.taskPhase;
    let isChecked = await this.checkTaskList(result.projectId, currentPhase);
    while (isChecked) {
      currentPhase = this.getNextState(currentPhase);
      isChecked = await this.checkTaskList(result.projectId, currentPhase);
      if (!isChecked) {
        await this.historyService.createHistory({
          projectId: result.projectId,
          state: currentPhase,
        });
      }
    }
    return result;
  }

  async checkTaskList(
    projectId: string,
    state: ProjectState,
  ): Promise<boolean> {
    const allTasks = await this.tasksRepository.find({
      where: { projectId, taskPhase: state },
    });
    const stateIndex = this.getStateIndex(state);
    const lastStateIndex = ProjectStateOrder.length - 1;

    if (stateIndex === lastStateIndex) {
      return false;
    }

    if (allTasks.length === 0) {
      return true;
    }

    const allTasksCompleted = allTasks.every((task) => task.taskState === true);
    return allTasksCompleted;
  }

  private getNextState(state: ProjectState) {
    const currentStateIndex = this.getStateIndex(state);
    if (currentStateIndex < ProjectStateOrder.length - 1) {
      return ProjectStateOrder[currentStateIndex + 1];
    } else {
      return null;
    }
  }

  getStateIndex(state: ProjectState): number {
    return ProjectStateOrder.indexOf(state);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Tasks> {
    const task = await this.findTaskById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.findTaskById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    await this.tasksRepository.delete(id);
  }
}
