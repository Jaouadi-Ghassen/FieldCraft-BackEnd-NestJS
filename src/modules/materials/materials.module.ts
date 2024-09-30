import { Module } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { MaterialsResolver } from './materials.resolver';
import { Materials } from '../../entities/Materials.entity';

import { Projects } from '../../entities/Project.entity';
// import { multerConfig } from '../../multer.config';
import { Images } from '../../entities/Images.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Materials]),
    TypeOrmModule.forFeature([Projects]),
    TypeOrmModule.forFeature([Images]),
    // MulterModule.registerAsync({
    //   useFactory: () => multerConfig,
    // }),
  ],
  providers: [MaterialsResolver, MaterialsService],
  exports: [MaterialsService],
})
export class MaterialsModule {}
