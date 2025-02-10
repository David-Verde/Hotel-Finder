import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(email: string, password: string, name: string, role: string) {
    // Verifica que el valor de role sea válido
    if (!Object.values(Role).includes(role as Role)) {
      throw new BadRequestException('Invalid role');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role as Role, // Asegúrate de que role sea del tipo Role
      },
    });
  }
}