import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Faq } from './entities/faq.entity';
import { FaqService } from './services/faq.service';
import { FaqController } from './controllers/faq.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'faq_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Faq]),
  ],
  controllers: [AppController, FaqController],
  providers: [AppService, FaqService],
})
export class AppModule {}
