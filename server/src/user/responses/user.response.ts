import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserResponse implements User {
    id: string;
    email: string;
    username: string;
    createdAt: Date;
    lastLoginAt: Date;
    isBlocked: boolean;

    @Exclude()
    password: string;

    constructor(user: User) {
        Object.assign(this, user);
    }
}
