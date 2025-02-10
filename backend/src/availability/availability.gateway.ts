import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect
  } from '@nestjs/websockets';
  
  import { Server, Socket } from 'socket.io';
  import { PrismaService } from '../prisma.service';
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class AvailabilityGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    constructor(private prisma: PrismaService) {}
  
    handleConnection(client: Socket) {
      const roomId = client.handshake.query.roomId as string;
      client.join(`room_${roomId}`);
    }
  
    handleDisconnect(client: Socket) { // Cambié el nombre de 'handleDisconnection' a 'handleDisconnect'
      const roomId = client.handshake.query.roomId as string;
      client.leave(`room_${roomId}`);
    }
  
    @SubscribeMessage('checkAvailability')
    async handleAvailabilityCheck(client: Socket, payload: { roomId: string, date: string }) {
      const bookings = await this.prisma.booking.findMany({
        where: {
          roomId: payload.roomId,
          startDate: {
            lte: new Date(payload.date)
          },
          endDate: {
            gte: new Date(payload.date)
          }
        }
      });
  
      client.emit('availabilityResult', {
        date: payload.date,
        available: bookings.length === 0
      });
    }
  
    // Method to broadcast availability updates
    async broadcastAvailabilityUpdate(roomId: string, date: string) {
      this.server.to(`room_${roomId}`).emit('availability_update', {
        type: 'availability_update',
        roomId,
        date
      });
    }
  }
  