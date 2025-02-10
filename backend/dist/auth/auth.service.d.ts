import { PrismaService } from '../prisma.service';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    register(email: string, password: string, name: string, role: string): Promise<{
        id: string;
        email: string;
        password: string | null;
        name: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
