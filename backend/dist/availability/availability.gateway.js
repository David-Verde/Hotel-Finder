"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const prisma_service_1 = require("../prisma.service");
let AvailabilityGateway = class AvailabilityGateway {
    constructor(prisma) {
        this.prisma = prisma;
    }
    handleConnection(client) {
        const roomId = client.handshake.query.roomId;
        client.join(`room_${roomId}`);
    }
    handleDisconnect(client) {
        const roomId = client.handshake.query.roomId;
        client.leave(`room_${roomId}`);
    }
    async handleAvailabilityCheck(client, payload) {
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
    async broadcastAvailabilityUpdate(roomId, date) {
        this.server.to(`room_${roomId}`).emit('availability_update', {
            type: 'availability_update',
            roomId,
            date
        });
    }
};
exports.AvailabilityGateway = AvailabilityGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AvailabilityGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('checkAvailability'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], AvailabilityGateway.prototype, "handleAvailabilityCheck", null);
exports.AvailabilityGateway = AvailabilityGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AvailabilityGateway);
//# sourceMappingURL=availability.gateway.js.map