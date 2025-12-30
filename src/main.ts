import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(
      `Server is running on port http://localhost:${process.env.PORT ?? 3000}`,
    );
  });
}
bootstrap().catch((err) => {
  if (err instanceof Error) {
    console.error('Error during application bootstrap:', err.message);
  } else {
    console.error('Error during application bootstrap:', err);
  }
});
