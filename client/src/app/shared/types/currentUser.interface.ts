export interface CurrentUserInterface {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
    bio: string | null;
    image: string | null;
    token: string;
}
