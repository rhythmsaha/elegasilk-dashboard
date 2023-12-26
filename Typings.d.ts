import { IUserTableData } from './components/users/usersTable/UsersTable';

export type IUserRoles = 'superadmin' | 'admin' | 'moderator' | 'guest';

export interface IUserAccount {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: number;
    role: IUserRoles;
    avatar: string;
}

type ImageFileType = File & {
    id: string;
    preview: string;
    publicUrl?: string;
};
