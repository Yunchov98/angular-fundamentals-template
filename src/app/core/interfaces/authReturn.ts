import User from './user';

export interface AuthReturn {
    successful: boolean;
    result: string;
    user: User;
}
