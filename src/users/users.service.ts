import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interface/user.interface';

@Injectable()
export class UserService {
  private users: User[] = [];

getAllUsers(filter: { gender?: string; email?: string; page: number; take: number }): User[] {
    let result = this.users;

    if (filter.gender) {
      result = result.filter((user) => user.gender === filter.gender);
    }
if (typeof filter.email === 'string') {
  result = result.filter((user) => user.email.startsWith(filter.email!));
}


    const start = (filter.page - 1) * filter.take;
    const end = start + filter.take;
    return result.slice(start, end);
  }

  getUserById(id: number): User {
    const user = this.users.find((el) => el.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  createUser(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: this.users.length + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  deleteUserById(id: number): string {
    const index = this.users.findIndex((el) => el.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    this.users.splice(index, 1);
    return 'Deleted successfully';
  }

  updateUserById(id: number, updateUserDto: UpdateUserDto): User {
    const user = this.getUserById(id);
    Object.assign(user, updateUserDto);
    return user;
  }
}
