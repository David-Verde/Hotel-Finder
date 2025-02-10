import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, placeId: number, rating: number, comment: string) {
    return this.prisma.review.create({
      data: { userId, placeId, rating, comment },
      include: { user: true },
    });
  }

  async getPlaceReviews(placeId: number) {
    return this.prisma.review.findMany({
      where: { placeId },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}