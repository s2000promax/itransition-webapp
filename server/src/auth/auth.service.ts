import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '@user/user.service';
import { Token, User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { v4 } from 'uuid';
import { add } from 'date-fns';
import { JwtService } from '@nestjs/jwt';
import { TokensInterface } from '@config/types/auth/tokens.interface';
import { JwtPayload } from '@config/types/auth/jwtPayload';
import { LoginDto, RegisterDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async register(dto: RegisterDto) {
        const user: User = await this.userService
            .findOne(dto.email)
            .catch((err) => {
                // this.logger.error(err);
                return null;
            });

        if (user) {
            throw new ConflictException(
                'User with the same email is already registered',
            );
        }
        return this.userService.save(dto).catch((err) => {
            return null;
        });
    }

    async login(dto: LoginDto): Promise<TokensInterface> {
        const user: User = await this.userService
            .findOne(dto.email, true)
            .catch((err) => {
                return null;
            });

        if (!user || !compareSync(dto.password, user.password)) {
            throw new UnauthorizedException('Wrong login or password');
        }

        await this.userService.updateLastLoginAt(dto);

        return this.generateTokens(user);
    }

    async refreshTokens(refreshToken: string): Promise<TokensInterface> {
        const token = await this.prismaService.token.delete({
            where: { token: refreshToken },
        });
        if (!token || new Date(token.expired) < new Date()) {
            throw new UnauthorizedException();
        }
        const user = await this.userService.findOne(token.userId);
        return this.generateTokens(user);
    }

    private async generateTokens(user: User): Promise<TokensInterface> {
        const jwtPayload: JwtPayload = {
            id: user.id,
            email: user.email,
        };
        const accessToken = 'Bearer ' + this.jwtService.sign(jwtPayload);

        const refreshToken = await this.getRefreshToken(user.id);

        return {
            accessToken,
            refreshToken,
        };
    }

    private async getRefreshToken(userId: string): Promise<Token> {
        const _token = await this.prismaService.token.findFirst({
            where: {
                userId,
            },
        });

        const token = _token?.token ?? '';

        return this.prismaService.token.upsert({
            where: { token },
            update: {
                token: v4(),
                expired: add(new Date(), { months: 1 }),
            },
            create: {
                token: v4(),
                expired: add(new Date(), { months: 1 }),
                userId,
            },
        });
    }

    deleteRefreshToken(token: string) {
        return this.prismaService.token.delete({
            where: {
                token,
            },
        });
    }
}
