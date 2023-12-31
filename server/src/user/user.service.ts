import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(user: Partial<User>) {
        const hashedPassword = user.password
            ? this.hashPassword(user.password)
            : null;

        const createdUser = await this.prismaService.user.create({
            data: {
                email: user.email,
                password: hashedPassword,
                username: user.username,
            },
        });

        if (!createdUser) {
            return null;
        } else {
            return createdUser;
        }
    }

    async findOne(idOrEmail: string): Promise<User> {
        const foundedUser = await this.prismaService.user.findFirst({
            where: {
                OR: [{ id: idOrEmail }, { email: idOrEmail }],
            },
        });

        if (!foundedUser) {
            return null;
        } else {
            return foundedUser;
        }
    }

    async findAll(): Promise<Array<User>> {
        const users = await this.prismaService.user.findMany();
        if (!users) {
            return null;
        } else {
            return users;
        }
    }

    async delete(ids: string[]) {
        const deleteResponse = await this.prismaService.user.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
        if (!deleteResponse) {
            return JSON.stringify('Failed to remove');
        }

        return JSON.stringify(`Success. Removed ${deleteResponse.count} users`);
    }

    async updateIsBlockedStatus(ids: string[], status: boolean) {
        if (Array.isArray(ids) && typeof status !== undefined) {
            const updateResponse = await this.prismaService.user.updateMany({
                where: {
                    id: {
                        in: ids,
                    },
                },
                data: {
                    isBlocked: status,
                },
            });
            if (!!updateResponse) {
                return JSON.stringify(
                    `Success. Updated ${updateResponse.count} users`,
                );
            }
        }

        return JSON.stringify('Failed to update');
    }

    async updateLastLoginAt(user: Partial<User>) {
        await this.prismaService.user
            .update({
                where: {
                    email: user.email,
                },
                data: {
                    lastLoginAt: new Date(Date.now()),
                },
            })
            .catch(() => {
                return JSON.stringify(`Field 'lastLoginAt' not updated`);
            });
    }

    private hashPassword(password: string) {
        return hashSync(password, genSaltSync(10));
    }
}
