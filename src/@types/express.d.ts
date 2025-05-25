import { User } from '../modules/tasks/tasks.entity';

declare global {
  namespace Express {
    interface Request {
      user?: Partial<User>;
    }
  }
}
