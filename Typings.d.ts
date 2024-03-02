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

export interface IProduct {
    _id: string;
    name: string;
    slug: string;
    description: string;
    images: string[];
    sku: string;
    MRP: number;
    discount: number;
    published: boolean;
    colors: string[];
    collections: string[];
    stock: number;
    attributes: {
        _id: string;
        category: string;
        subcategory: string[];
    }[];
    specs: {
        name: string;
        value: string;
    }[];
    createdAt: string;
    updatedAt: string;
}
