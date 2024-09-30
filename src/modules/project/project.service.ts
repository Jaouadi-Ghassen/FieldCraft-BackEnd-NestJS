import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Projects } from '../../entities/Project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/createProject.dto';
import { ProjectState } from '../../utils/enum/projectState.enum';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { User } from '../../entities/User.entity';
import { UserService } from '../user/user.service';
import { HistoryService } from '../history/history.service';
import { FirebaseService } from '../../firebase.service';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateNotificationtDto } from '../notifications/dto/notification.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Projects)
    private projectsRepository: Repository<Projects>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly historyService: HistoryService,
    private readonly firebaseService: FirebaseService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async findAll(): Promise<Projects[]> {
    return await this.projectsRepository.find();
  }

  async findOneById(id: string): Promise<Projects | null> {
    return await this.projectsRepository.findOneBy({ id });
  }

  async findProjectsByUserId(userId: string): Promise<Projects[]> {
    const user = await this.userRepository.find({
      where: { id: userId },
      relations: ['projects'],
      order: { projects: { createdAt: 'DESC' } },
    });
    if (!user || user.length === 0) {
      throw new NotFoundException('user not found');
    }
    return user[0].projects;
  }

  async findByProjectName(projectName: string): Promise<Projects | null> {
    return await this.projectsRepository.findOneBy({ projectName });
  }

  async findByProjectReference(reference: string): Promise<Projects | null> {
    return await this.projectsRepository.findOneBy({ reference });
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<Projects> {
    const existingProjectRef = await this.findByProjectReference(
      createProjectDto.reference,
    );
    const existingProjectName = await this.findByProjectName(
      createProjectDto.projectName,
    );

    if (existingProjectRef || existingProjectName) {
      throw new ConflictException('project already exist');
    }

    console.log(createProjectDto);
    const project = await this.projectsRepository.save(
      this.projectsRepository.create(createProjectDto),
    );
    console.log(project);
    this.historyService.createHistory({
      projectId: project.id,
      state: ProjectState.planning,
    });
    return project;
  }

  async updateProject(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Projects> {
    const project = await this.findOneById(id);
    if (!project) {
      throw new NotFoundException('project not found');
    }

    await this.projectsRepository.update({ id }, updateProjectDto);
    return await this.findOneById(id);
  }

  async deleteProject(id: string): Promise<void> {
    const project = await this.findOneById(id);
    if (!project) {
      throw new NotFoundException('project not found');
    }
    await this.projectsRepository.delete({ id });
  }

  // async assignUserToProject(
  //   userId: string,
  //   projectIds: string[],
  // ): Promise<boolean> {
  //   const user = await this.userService.findUserById(userId);

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   const newProjects = await Promise.all(
  //     projectIds.map((id) => this.findOneById(id)),
  //   );

  //   if (newProjects.some((project) => !project)) {
  //     throw new NotFoundException('Some projects not found');
  //   }

  //   const existingProjects = user.projects || [];
  //   const updatedProjects = existingProjects.concat(
  //     newProjects.filter(
  //       (newProject) =>
  //         !existingProjects.some((project) => project.id === newProject.id),
  //     ),
  //   );

  //   user.projects = updatedProjects;

  //   await this.userRepository.save(user);

  //   // Send notification to the user
  //   if (user.deviceToken) {
  //     const projectNames = newProjects
  //       .map((project) => project.projectName)
  //       .join(', ');
  //     await this.firebaseService.sendNotification(
  //       user.deviceToken,
  //       'Assigned to New Projects',
  //       `You have been assigned to the following projects: ${projectNames}`,
  //     );
  //   }

  //   return true;
  // }

  async assignUserToProject(
    userId: string,
    projectIds: string[],
  ): Promise<boolean> {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newProjects = await Promise.all(
      projectIds.map((id) => this.findOneById(id)),
    );

    if (newProjects.some((project) => !project)) {
      throw new NotFoundException('Some projects not found');
    }

    const existingProjects = user.projects || [];
    const updatedProjects = existingProjects.concat(
      newProjects.filter(
        (newProject) =>
          !existingProjects.some((project) => project.id === newProject.id),
      ),
    );

    user.projects = updatedProjects;

    await this.userRepository.save(user);

    // Create notifications
    const notificationPromises = newProjects.map(async (project) => {
      const notificationDto: CreateNotificationtDto = {
        title: 'Assigned to New Project',
        subTitle: 'New assignment',
        content: `You have been assigned to project: ${project.projectName}`,
      };

      await this.notificationsService.createNotification(
        notificationDto,
        // userId,
      );
    });

    await Promise.all(notificationPromises);

    // Send notification to the user if device token is available
    if (user.deviceToken) {
      const projectNames = newProjects
        .map((project) => project.projectName)
        .join(', ');
      await this.firebaseService.sendNotification(
        user.deviceToken,
        'Assigned to New Projects',
        `You have been assigned to the following projects: ${projectNames}`,
      );
    }

    return true;
  }
}
