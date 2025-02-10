import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../prisma.service';
export declare class AvailabilityGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private prisma;
    server: Server;
    constructor(prisma: PrismaService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleAvailabilityCheck(client: Socket, payload: {
        roomId: string;
        date: string;
    }): Promise<void>;
    broadcastAvailabilityUpdate(roomId: string, date: string): Promise<void>;
}
