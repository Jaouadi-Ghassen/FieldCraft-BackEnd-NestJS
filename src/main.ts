import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress());
  // app.use(express.json({ limit: '5mb' }));
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
