import { Module } from '@nestjs/common';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';
import { buildTypeOrmModule } from './database/build_database';
import { AuthModule } from './modules/auth/auth.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { CategoryModule } from './modules/category/category.module';
import { HistoryModule } from './modules/history/history.module';
import { MaterialsModule } from './modules/materials/materials.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirebaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    UserModule,
    AuthModule,
    ProjectModule,
    buildTypeOrmModule(),
    TasksModule,
    CategoryModule,
    HistoryModule,
    MaterialsModule,
    NotificationsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/uploads/',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
