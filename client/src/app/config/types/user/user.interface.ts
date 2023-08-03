export interface UserInterface {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    lastLoginAt: Date;
    accessToken: string;
    status: boolean;
}
