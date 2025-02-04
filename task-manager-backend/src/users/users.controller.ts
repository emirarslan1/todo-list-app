import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    
    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }

    @Post('/register')
    async register(@Body() body: CreateUserDto) {
        return this.usersService.createUser(body.username, body.password);
    }

    @Get('/:id')
    async getUser(@Param('id') id: string){
        return this.usersService.getUserById(id);
    }
}
