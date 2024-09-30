import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Projects } from '../../entities/Project.entity';
import { Roles } from '../../common/decorator/roles.decorator';
import { UsePipes } from '@nestjs/common';
import { YupValidationPipe } from '../../utils/pipes/yupValidationPipe';
import { CreateProjectDto } from './dto/createProject.dto';
import { UserRole } from '../../utils/enum/userRole.enum';
import {
  CreateProjectValidation,
  UpdateProjectValidation,
} from '../../utils/validation/projectsValidation';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { CurrentUser } from '../../common/decorator/user.decorator';
import { User } from '../../entities/User.entity';

@Resolver()
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [Projects])
  async getProjects(): Promise<Projects[]> {
    return this.projectService.findAll();
  }

  @Query(() => [Projects])
  async filterProjects(@CurrentUser() user: User): Promise<Projects[]> {
    return this.projectService.findProjectsByUserId(user.id);
  }

  @Query(() => Projects)
  async getProjectId(@Args('id') id: string): Promise<Projects> {
    return this.projectService.findOneById(id);
  }

  @Mutation(() => Projects)
  @Roles(UserRole.admin)
  @UsePipes(new YupValidationPipe(CreateProjectValidation))
  create_project(@Args('values') values: CreateProjectDto): Promise<Projects> {
    return this.projectService.createProject(values);
  }

  @Mutation(() => Projects)
  @Roles(UserRole.admin)
  @UsePipes(new YupValidationPipe(UpdateProjectValidation))
  async update_project(
    @Args('id') id: string,
    @Args('values') values: UpdateProjectDto,
  ): Promise<Projects> {
    return this.projectService.updateProject(id, values);
  }

  @Mutation(() => Boolean)
  @Roles(UserRole.admin)
  async assignUserToProject(
    @Args('userId') userId: string,
    @Args('projectId', { type: () => [String] }) projectId: string[],
  ): Promise<boolean> {
    const result = await this.projectService.assignUserToProject(
      userId,
      projectId,
    );
    return result;
  }
}
