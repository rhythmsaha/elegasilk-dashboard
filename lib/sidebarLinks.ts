import { MdManageAccounts, MdOutlineCollectionsBookmark, MdSpeed } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { BiBell, BiCategory } from 'react-icons/bi';
import { IoDocumentText } from 'react-icons/io5';
import { FaUserFriends } from 'react-icons/fa';
import { BsFillCartFill } from 'react-icons/bs';
import { IconType } from 'react-icons';
import { IUserRoles } from '@/Typings';

export interface ISidebarLink {
    id: string;
    title: string;
    icon: IconType;
    path: string;
    roles?: IUserRoles[];
}

export interface ISidebarConfig {
    id: string;
    type: string;
    menus: ISidebarLink[];
}

export const sidebarConfig: ISidebarConfig[] = [
    {
        id: 'generalmenu',
        type: 'General',
        menus: [{ id: 'dashboardlink', title: 'Dashboard', icon: MdSpeed, path: '/', roles: ['superadmin', 'admin', 'moderator'] }],
    },

    {
        id: 'inventoryMneu',
        type: 'inventory',
        menus: [
            { id: 'categoriesmenu', title: 'Categories', icon: BiCategory, path: '/categories', roles: ['admin', 'superadmin', 'moderator'] },
            { id: 'collectionsMenu', title: 'Collections', icon: MdOutlineCollectionsBookmark, path: '/collections', roles: ['admin', 'superadmin', 'moderator'] },
            // { id: 'link3', title: 'Products', icon: BsFillCartFill, path: '/products' },
        ],
    },

    {
        id: 'managementMenu',
        type: 'Management',
        menus: [
            { id: 'adminusersmenu', title: 'Users', icon: MdManageAccounts, path: '/users', roles: ['admin', 'superadmin'] },
            { id: 'customersmenu', title: 'Customers', icon: FaUserFriends, path: '/customers' },

            // { id: 'link4', title: 'Orders', icon: IoDocumentText, path: '/invoices' },
        ],
    },
];
