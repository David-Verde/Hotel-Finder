import { Module } from '@nestjs/common';
import { AvailabilityGateway } from './availability.gateway';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [AvailabilityGateway, PrismaService],
  exports: [AvailabilityGateway],
})
export class AvailabilityModule {}