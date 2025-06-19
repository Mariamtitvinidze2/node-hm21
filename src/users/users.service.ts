import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interface/user.interface'; 

@Injectable()
export class UserService {
  private users: User[] = []; 

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User {
    const user = this.users.find((el) => el.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  createUser(createUserDto: CreateUserDto): User {
    const { firstName, lastName, email, phoneNumber, gender } = createUserDto;
    if (!email || !firstName || !lastName) {
      throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
    }

    const newUser: User = {
      id: this.users.length + 1,
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
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
