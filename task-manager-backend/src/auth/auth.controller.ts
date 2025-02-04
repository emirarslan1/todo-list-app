import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(
        @Body() body: { username: string; password: string },
    ): Promise<{ message: string }> {
        await this.authService.register(body.username, body.password);
        return { message: 'Kayit başarili!' };
    }

    @Post('login')
    async login(
        @Body() body: { username: string; password: string },
    ): Promise<{ access_token: string }> {
        const user = await this.authService.validateUser(
            body.username,
            body.password,
        );
        if (!user) {
            throw new Error('Kullanici adi veya şifre yanliş!');
        }
        return this.authService.login(user);
    }
}