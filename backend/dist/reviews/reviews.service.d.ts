import { PrismaService } from '../prisma.service';
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, placeId: number, rating: number, comment: string): Promise<{
        user: {
            id: string;
            email: string;
            password: string | null;
            name: string;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        hotelId: string | null;
        placeId: number | null;
        rating: number;
        comment: string;
    }>;
    getPlaceReviews(placeId: number): Promise<({
        user: {
            id: string;
            email: string;
            password: string | null;
            name: string;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        hotelId: string | null;
        placeId: number | null;
        rating: number;
        comment: string;
    })[]>;
}
