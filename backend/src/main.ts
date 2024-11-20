import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FaqService } from './services/faq.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });

  const faqService = app.get(FaqService);
  await faqService.seedFaqs();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
