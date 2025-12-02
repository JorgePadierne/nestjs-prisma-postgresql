import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  public prisma: PrismaClient;

  constructor() {
    // No inicializar Prisma aquí, lo hacemos en onModuleInit
  }

  async onModuleInit() {
    this.prisma = new PrismaClient();
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    if (this.prisma) {
      await this.prisma.$disconnect();
    }
  }
}
