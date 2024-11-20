import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq } from '../entities/faq.entity';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq)
    private faqRepository: Repository<Faq>,
  ) {}

  findAll(): Promise<Faq[]> {
    return this.faqRepository.find({ order: { id: 'ASC' } });
  }

  findOne(id: number): Promise<Faq> {
    return this.faqRepository.findOneBy({ id });
  }

  async create(faq: Partial<Faq>): Promise<Faq> {
    const newFaq = this.faqRepository.create(faq);
    return this.faqRepository.save(newFaq);
  }

  async update(id: number, faq: Partial<Faq>): Promise<Faq> {
    await this.faqRepository.update(id, faq);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.faqRepository.delete(id);
  }

  async seedFaqs(): Promise<void> {
    const faqsCount = await this.faqRepository.count();
    if (faqsCount === 0) {
      const sampleFaqs = [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for all products.',
        },
        {
          question: 'How do I track my order?',
          answer: 'You can track your order by logging into your account and navigating to the "Orders" section.',
        },
        {
          question: 'Do you offer international shipping?',
          answer: 'Yes, we offer international shipping to most countries.',
        },
      ];

      await this.faqRepository.save(sampleFaqs);
    }
  }
}
