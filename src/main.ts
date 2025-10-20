import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const port = process.env.PORT ?? 3009;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: true, // Allow all origins in development
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // يحذف أي حقل غير موجود في DTO
      forbidNonWhitelisted: true, // يطلع خطأ لو فيه حقل غير موجود في DTO
      transform: true, // يحوّل JSON للكلاسات
    }),
  );
  await app.listen(port);
}
bootstrap();
