import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMaterialsDto } from './dto/create-materials.dto';
import { UpdateMaterialsDto } from './dto/update-materials.dto';
import { Materials } from '../../entities/Materials.entity';
import { Projects } from '../../entities/Project.entity';
import { Images } from '../../entities/Images.entity';
import { uploadImage } from '../../utils/helpers/uploadImage';
import { ImageType } from '../../utils/enum/imagePath.enum';
import { UploadMaterialImageDTO } from './dto/MaterialImage.dto';
import * as ExcelJS from 'exceljs';
import { Stream } from 'stream';
@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Materials)
    private readonly materialRepository: Repository<Materials>,
    @InjectRepository(Projects)
    private readonly projectsRepository: Repository<Projects>,
    @InjectRepository(Images)
    private readonly imagesRepository: Repository<Images>,
  ) {}

  async findMaterialById(id: string): Promise<Materials> {
    const material = await this.materialRepository.findOne({
      where: { id },
      relations: ['images'],
    });
    if (!material) {
      throw new NotFoundException('Material not found');
    }
    material.images = material.images || [];
    return material;
  }

  async findMaterialsByProjectId(projectId: string): Promise<Materials[]> {
    const project = await this.projectsRepository.find({
      where: { id: projectId },
      relations: ['materials'],
      order: { materials: { createdAt: 'DESC' } },
    });
    if (!project || project.length === 0) {
      throw new NotFoundException('Project not found');
    }
    return project[0].materials;
  }

  async findMaterialsByUser(userId: string): Promise<Materials[]> {
    const materials = await this.materialRepository
      .createQueryBuilder('material')
      .where('material.createdById = :userId', { userId })
      .getMany();

    if (!materials || materials.length === 0) {
      throw new NotFoundException('No materials found for this user');
    }

    return materials;
  }

  async createMaterial(
    createMaterialsDto: CreateMaterialsDto,
    id: string,
  ): Promise<Materials> {
    console.log(createMaterialsDto);
    const existingMaterial = await this.materialRepository.findOne({
      where: { materialName: createMaterialsDto.materialName },
    });
    if (existingMaterial) {
      throw new ConflictException('Material already exists');
    }
    const newMaterial = this.materialRepository.create({
      ...createMaterialsDto,
      created_by_id: id,
    });
    return await this.materialRepository.save(newMaterial);
  }

  async updateMaterial(
    id: string,
    updateMaterialsDto: UpdateMaterialsDto,
  ): Promise<Materials> {
    const material = await this.findMaterialById(id);
    Object.assign(material, updateMaterialsDto);
    return await this.materialRepository.save(material);
  }

  async deleteMaterial(id: string): Promise<void> {
    const result = await this.materialRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Material not found');
    }
  }

  async uploadImage(
    uploadMaterialImageDTO: UploadMaterialImageDTO,
  ): Promise<Images> {
    const imagePath = await uploadImage(
      uploadMaterialImageDTO.image,
      ImageType.materials,
    );
    const existingMaterial = await this.findMaterialById(
      uploadMaterialImageDTO.materialId,
    );
    if (!existingMaterial) {
      throw new NotFoundException('Material not found');
    }
    const newImage = this.imagesRepository.create({
      materialtId: uploadMaterialImageDTO.materialId,
      imagePath: imagePath,
    });

    console.log(newImage);
    await this.imagesRepository.save(newImage);
    return newImage;
  }

  // async exportMaterialsByProjectId(projectId: string): Promise<string> {
  //   // Fetch materials by project ID
  //   const materials = await this.findMaterialsByProjectId(projectId);

  //   // Create a new workbook and worksheet
  //   const workbook = new Workbook();
  //   const worksheet = workbook.addWorksheet('Materials');

  //   // Add header row
  //   worksheet.addRow(['ID', 'Name', 'Description', 'Quantity', 'Created At']);

  //   // Add data rows
  //   materials.forEach((material) => {
  //     worksheet.addRow([
  //       material.id,
  //       material.materialName,
  //       material.description,
  //       material.quantity,
  //       material.createdAt,
  //     ]);
  //   });

  //   // Set columns width
  //   worksheet.columns = [
  //     { key: 'id', width: 20 },
  //     { key: 'materialName', width: 30 },
  //     { key: 'description', width: 30 },
  //     { key: 'quantity', width: 15 },
  //     { key: 'createdAt', width: 20 },
  //   ];

  //   // Create a unique file name
  //   const fileName = `materials_${projectId}_${Date.now()}.xlsx`;

  //   // Write to a local file
  //   await workbook.xlsx.writeFile(fileName);

  //   // Return the file name (or path) so it can be sent back to the user
  //   return fileName;
  // }

  async exportMaterialsToExcel(projectId: string): Promise<Stream> {
    const materials = await this.findMaterialsByProjectId(projectId);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Materials');

    // Define columns
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 30 },
      { header: 'Name', key: 'materialName', width: 30 },
      { header: 'Description', key: 'description', width: 30 },
      { header: 'Created At', key: 'createdAt', width: 30 },
      // Add more columns as needed
    ];

    // Add rows
    materials.forEach((material) => {
      worksheet.addRow({
        id: material.id,
        materialName: material.materialName,
        description: material.description,
        createdAt: material.createdAt,
        // Add more fields as needed
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const stream = new Stream.PassThrough();
    stream.end(buffer);

    return stream;
  }
}
