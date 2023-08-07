import {
    BadRequestException,
    ForbiddenException,
    Inject,
    Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { User } from '@prisma/client';
import { convertToMillisecondsUtil } from '@libs/utils';
import { JwtPayload } from '@config/types/auth/jwtPayload';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly configService: ConfigService,
    ) {}

    async save(user: Partial<User>) {
        const hashedPassword = user?.password
            ? this.hashPassword(user.password)
            : null;

        const updatedUser = await this.findOne(user.id);

        const savedUser = await this.prismaService.user.upsert({
            where: {
                email: user.email ?? updatedUser.email,
            },
            update: {
                ...updatedUser,
                isBlocked: user.isBlocked,
            },
            create: {
                email: user.email ?? updatedUser.email,
                password: hashedPassword,
                username: user.username,
            },
        });

        await this.cacheManager.set(savedUser.id, savedUser);
        await this.cacheManager.set(savedUser.email, savedUser);

        return savedUser;
    }

    async findOne(idOrEmail: string, isReset = false): Promise<User> {
        if (isReset) {
            await this.cacheManager.del(idOrEmail);
        }

        const user = await this.cacheManager.get<User>(idOrEmail);

        if (!user) {
            const foundedUser = await this.prismaService.user.findFirst({
                where: {
                    OR: [{ id: idOrEmail }, { email: idOrEmail }],
                },
            });
            if (!foundedUser) {
                return null;
            }
            await this.cacheManager.set(
                idOrEmail,
                foundedUser,
                convertToMillisecondsUtil(
                    this.configService.get('JWT_EXPIRED'),
                ),
            );
            return foundedUser;
        }

        return user;
    }

    async findAll(): Promise<Array<User>> {
        return this.prismaService.user.findMany();
    }

    async delete(id: string, user: JwtPayload) {
        if (user.id === id) {
            throw new ForbiddenException();
        }

        await Promise.all([
            await this.cacheManager.del(id),
            await this.cacheManager.del(user.email),
        ]);

        return this.prismaService.user.delete({
            where: { id },
            select: { id: true },
        });
    }

    private hashPassword(password: string) {
        return hashSync(password, genSaltSync(10));
    }

    async updateLastLoginAt(user: Partial<User>) {
        await this.prismaService.user.update({
            where: {
                email: user.email,
            },
            data: {
                lastLoginAt: new Date(Date.now()),
            },
        });
    }
}
