import type { Request, Response } from 'express';
import { z } from 'zod';
import { prismaClient } from '@/database/prismaClient';

const routineSchema = z.object({
  userId: z.string(),
  description: z.string(),
  name: z.string(),
});

class RoutineController {
  public async list(request: Request, response: Response): Promise<void> {
    const userRoutines = await prismaClient.routine.findMany();
    response.status(200).json(userRoutines);
  }

  public async getUserRoutines(
    request: Request,
    response: Response
  ): Promise<void> {
    const { userId } = request.params;

    const userRoutines = await prismaClient.routine.findMany({
      where: { user_id: userId },
    });

    response.status(200).json(userRoutines);
  }

  public async create(request: Request, response: Response): Promise<void> {
    const { userId, name, description } = routineSchema.parse(request.body);

    const routine = await prismaClient.routine.create({
      data: {
        user_id: userId,
        description,
        name,
      },
    });

    response.status(201).json(routine);
  }
}

export default RoutineController;
