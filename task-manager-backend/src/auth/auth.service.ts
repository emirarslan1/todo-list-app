import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { stringify } from 'querystring';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOneByUsername(username);
        if (user && (await bcrypt.compare(password, user.password))){
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user:any) {
        const payload = { username: user.username, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(username: string , password: string){
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.userService.createUser(username, hashedPassword);
    }
}
