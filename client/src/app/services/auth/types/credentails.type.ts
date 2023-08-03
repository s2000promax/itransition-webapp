import { UserInterface } from '@config/types/user/user.interface';

export type Credentials = Pick<UserInterface, 'email' | 'password'>;

export type LoginResponse = Pick<UserInterface, 'accessToken'>;

export type RegisterResponse = Pick<UserInterface, 'id'>;
