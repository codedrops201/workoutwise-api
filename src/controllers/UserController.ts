import type { Request, Response } from 'express';
import { z } from 'zod';
import { prismaClient } from '@/database/prismaClient';

const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z
    .string()
    .min(8, { message: 'Password must be more than 8 characters' }),
});

class UserController {
  public async create(request: Request, response: Response): Promise<void> {
    const { name, email, password } = userSchema.parse(request.body);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    // remover a password da response
    response.status(201).json(user);
  }
}

export default UserController;
