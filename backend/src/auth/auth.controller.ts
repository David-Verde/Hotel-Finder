import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from '@prisma/client'; // Importa el enum Role desde el cliente de Prisma

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; name: string; role: Role }) {
    const { email, name, role } = body;
    return this.authService.register(email, 'defaultPassword', name, role);
  }
}