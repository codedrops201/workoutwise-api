import UserController from '@/controllers/UserController';
import RoutineController from '@/controllers/RoutineController';
import { Router } from 'express';

const router = Router();

const createUser = new UserController();
const routineController = new RoutineController();

router.post('/users', createUser.create);

router.get('/routines', routineController.list);
router.get('/routines/:userId', routineController.getUserRoutines);
router.post('/routines', routineController.create);

export default router;
