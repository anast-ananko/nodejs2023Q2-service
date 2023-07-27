import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from './user.interface';

type returnedUser = Omit<User, 'password'>;

export interface UsersStore {
  findAll: () => returnedUser[];
  findById: (id: string) => returnedUser | undefined;
  findByIdWithPassword: (id: string) => User | undefined;
  create: (dto: CreateUserDto) => returnedUser;
  update: (id: string, dto: UpdateUserDto) => returnedUser;
  delete: (id: string) => User | null;
}
