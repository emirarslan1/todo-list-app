import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
// import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ){}

    async getAllUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }
    
    async findOneByUsername(username: string): Promise<User | undefined> {
        return this.usersRepository.findOne({where : {username}});
    } 

    async createUser(username: string, password: string): Promise<User> {
        const user = this.usersRepository.create({username, password});
        return this.usersRepository.save(user);
    }

    async getUserById(id: string): Promise<User> {
        return this.usersRepository.findOne({ where: { id } });
    }

}
