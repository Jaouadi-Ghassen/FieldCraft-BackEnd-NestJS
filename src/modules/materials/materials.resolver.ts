import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Materials } from '../../entities/Materials.entity';
import { CreateMaterialsDto } from './dto/create-materials.dto';
import { UpdateMaterialsDto } from './dto/update-materials.dto';
import { MaterialsService } from './materials.service';
import { UploadMaterialImageDTO } from './dto/MaterialImage.dto';
import { Images } from '../../entities/Images.entity';
import { CurrentUser } from '../../common/decorator/user.decorator';
import { User } from '../../entities/User.entity';
import { YupValidationPipe } from '../../utils/pipes/yupValidationPipe';
import { CreateMaterialsValidation } from '../../utils/validation/materialsValidation';
import { createWriteStream } from 'fs';
import * as os from 'os';
import * as path from 'path';

@Resolver()
export class MaterialsResolver {
  constructor(private readonly materialsService: MaterialsService) {}

  @Query(() => Materials)
  async material(@Args('id') id: string): Promise<Materials> {
    return this.materialsService.findMaterialById(id);
  }

  @Query(() => Materials)
  async getProjectId(@Args('id') id: string): Promise<Materials> {
    return this.materialsService.findMaterialById(id);
  }

  @Query(() => [Materials])
  async materialsByUser(@Args('userId') userId: string): Promise<Materials[]> {
    return this.materialsService.findMaterialsByUser(userId);
  }

  @Query(() => [Materials])
  async filterMaterials(@Args('projectId') id: string): Promise<Materials[]> {
    return this.materialsService.findMaterialsByProjectId(id);
  }
  @Mutation(() => Materials)
  async createMaterial(
    @Args('values', new YupValidationPipe(CreateMaterialsValidation))
    values: CreateMaterialsDto,
    @CurrentUser() user: User,
  ): Promise<Materials> {
    console.log(user);
    return this.materialsService.createMaterial(values, user.id);
  }

  @Mutation(() => Materials)
  async updateMaterial(
    @Args('id') id: string,
    @Args('values') values: UpdateMaterialsDto,
  ): Promise<Materials> {
    console.log('update material', id, values);
    return this.materialsService.updateMaterial(id, values);
  }

  @Mutation(() => Boolean)
  async deleteMaterial(@Args('id') id: string): Promise<boolean> {
    await this.materialsService.deleteMaterial(id);
    return true;
  }

  @Mutation(() => Images)
  async uploadFile(
    @Args('values', { type: () => UploadMaterialImageDTO })
    values: UploadMaterialImageDTO,
  ): Promise<Images> {
    return this.materialsService.uploadImage(values);
  }

  @Mutation(() => Boolean)
  async exportMaterialsToExcel(
    @Args('projectId') projectId: string,
  ): Promise<boolean> {
    const stream =
      await this.materialsService.exportMaterialsToExcel(projectId);

    const downloadsPath = path.join(os.homedir(), 'Downloads');
    const filePath = path.join(downloadsPath, `materials-${projectId}.xlsx`);
    const writeStream = createWriteStream(filePath);
    stream.pipe(writeStream);

    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => resolve(true));
      writeStream.on('error', (error) =>
        reject(new Error(`File write error: ${error.message}`)),
      );
    });
  }
}
