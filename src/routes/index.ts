import UserController from '@/controllers/UserController';
import { Router } from 'express';

const router = Router();

const createUser = new UserController();

router.get('/', (request, response) => {
  return response.json({ message: 'Hello World!' });
});

router.post('/users', createUser.create);

export default router;
