import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { FaqService } from '../services/faq.service';
import { Faq } from '../entities/faq.entity';

@Controller('faqs')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  findAll(): Promise<Faq[]> {
    return this.faqService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Faq> {
    return this.faqService.findOne(id);
  }

  @Post()
  create(@Body() faq: Partial<Faq>): Promise<Faq> {
    return this.faqService.create(faq);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() faq: Partial<Faq>): Promise<Faq> {
    return this.faqService.update(id, faq);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.faqService.remove(id);
  }
}
