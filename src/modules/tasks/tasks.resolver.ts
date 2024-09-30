import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'; // Import Query from the correct module
import { TasksService } from './tasks.service';
import { Tasks } from '../../entities/Tasks.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { Roles } from '../../common/decorator/roles.decorator';
import { UserRole } from '../../utils/enum/userRole.enum';
import { UsePipes } from '@nestjs/common';
import { YupValidationPipe } from '../../utils/pipes/yupValidationPipe';
import {
  CreateTaskValidation,
  UpdateTaskValidation,
} from '../../utils/validation/tasksValidation';

@Resolver()
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(() => [Tasks])
  async tasks(): Promise<Tasks[]> {
    return this.tasksService.findAll();
  }

  @Query(() => [Tasks])
  async filterTasks(@Args('projectId') id: string): Promise<Tasks[]> {
    return this.tasksService.findTasksByProjectId(id);
  }

  @Query(() => Tasks)
  async task_id(@Args('id') id: string): Promise<Tasks> {
    return this.tasksService.findTaskById(id);
  }

  @Mutation(() => Tasks)
  @Roles(UserRole.admin)
  @UsePipes(new YupValidationPipe(CreateTaskValidation))
  async create_task(
    @Args('values') createTaskDto: CreateTaskDto,
  ): Promise<Tasks> {
    return await this.tasksService.createTask(createTaskDto);
  }

  @Mutation(() => Tasks)
  async updateTaskState(
    @Args('id') id: string,
    @Args('taskState') taskState: boolean,
  ): Promise<Tasks> {
    console.log('update task', id, taskState);
    return await this.tasksService.updateTaskState(id, taskState);
  }

  @Mutation(() => Tasks, { nullable: true })
  @Roles(UserRole.admin)
  @UsePipes(new YupValidationPipe(UpdateTaskValidation))
  async update_task(
    @Args('id') id: string,
    @Args('values') updateTaskDto: UpdateTaskDto,
  ): Promise<Tasks | null> {
    return await this.tasksService.updateTask(id, updateTaskDto);
  }

  @Mutation(() => Boolean)
  @Roles(UserRole.admin)
  async delete_task(@Args('id') id: string): Promise<boolean> {
    await this.tasksService.deleteTask(id);
    return true;
  }
}
