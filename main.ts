import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  

  app.useStaticAssets('house_rental');


  app.use(
    '*',
    (
      req: any,
      res: { sendFile: (arg0: string, arg1: { root: string }) => void },
    ) => {
      res.sendFile('index.html', { root: 'house_rental' });
  });

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
