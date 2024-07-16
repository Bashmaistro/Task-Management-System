import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, // Tüm kaynaklardan gelen isteklere izin ver
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Credential (cookie, Authorization header vb.) ile isteklere izin ver
  });
  await app.listen(3000);
}
bootstrap();
