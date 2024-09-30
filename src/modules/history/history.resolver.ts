import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { HistoryService } from './history.service';
import { History } from '../../entities/History.entity';
import { Roles } from '../../common/decorator/roles.decorator';
import { UserRole } from '../../utils/enum/userRole.enum';
import { UsePipes } from '@nestjs/common';
import { CreateHistoryDto } from './dto/createHistory.dto';
import { YupValidationPipe } from '../../utils/pipes/yupValidationPipe';
import { CreateHistoryValidation } from '../../utils/validation/historyValidation';
import { ProjectState } from '../../utils/enum/projectState.enum';

@Resolver()
export class HistoryResolver {
  constructor(private readonly historyService: HistoryService) {}

  @Query(() => [History])
  async histories(): Promise<History[]> {
    return this.historyService.findAll();
  }

  @Query(() => History)
  async historyById(@Args('id') id: string): Promise<History> {
    return this.historyService.findHistoryById(id);
  }

  @Query(() => [History])
  async findAllHistoryForProjectById(
    @Args('projectId') projectId: string,
  ): Promise<History[]> {
    return this.historyService.findAllHistoryForProjectById(projectId);
  }

  @Query(() => ProjectState, { nullable: true })
  async stateByProjectId(@Args('id') id: string): Promise<ProjectState | null> {
    return this.historyService.findStateByProjectId(id);
  }

  @Mutation(() => History)
  @Roles(UserRole.admin)
  @UsePipes(new YupValidationPipe(CreateHistoryValidation))
  async createHistory(
    @Args('values') values: CreateHistoryDto,
  ): Promise<History> {
    return this.historyService.createHistory(values);
  }

  @Mutation(() => Boolean)
  @Roles(UserRole.admin)
  async deleteHistory(@Args('id') id: string): Promise<boolean> {
    await this.historyService.deleteHistory(id);
    return true;
  }
}
