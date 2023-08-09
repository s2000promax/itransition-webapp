import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpCode,
    Put,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from '../libs/decorators';
import { UserResponse } from './responses';

interface BodyRequestInterface {
    ids: string[];
    status: boolean;
    delete: boolean;
}

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getAllUsers() {
        return await this.userService.findAll();
    }

    @Get('me')
    me(@CurrentUser() user: UserResponse) {
        return JSON.stringify(user.id);
    }

    @Put()
    async updateUsers(@Body() body: BodyRequestInterface) {
        if (body.delete) {
            return await this.userService.delete(body.ids);
        } else {
            return await this.userService.updateIsBlockedStatus(
                body.ids,
                body.status,
            );
        }
    }
}
