import { AuthService } from './auth.service';
import { Role } from '@prisma/client';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: {
        email: string;
        name: string;
        role: Role;
    }): Promise<{
        email: string;
        name: string;
        role: import("@prisma/client").$Enums.Role;
        id: string;
        password: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
