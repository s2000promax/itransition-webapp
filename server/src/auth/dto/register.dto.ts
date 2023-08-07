import { IsEmail, IsString, MinLength, Validate } from 'class-validator';
import { IsPasswordsMatchingConstraint } from '../../libs/decorators';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(1)
    password: string;

    @IsString()
    @MinLength(1)
    @Validate(IsPasswordsMatchingConstraint)
    passwordRepeat: string;
}
