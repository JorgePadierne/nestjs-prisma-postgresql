import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from '@prisma/client';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.prisma.prisma.task.findMany();
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.prisma.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    return task;
  }

  async createTask(data: CreateTaskDto): Promise<Task> {
    return await this.prisma.prisma.task.create({ data });
  }

  async updateTask(id: number, data: UpdateTaskDto): Promise<Task> {
    try {
      return await this.prisma.prisma.task.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async deleteTask(id: number): Promise<Task> {
    try {
      return await this.prisma.prisma.task.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}
