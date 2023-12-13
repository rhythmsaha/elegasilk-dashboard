import { MdAdminPanelSettings, MdInventory2, MdOutlineCollectionsBookmark, MdSpeed } from 'react-icons/md';
import { BiCategory } from 'react-icons/bi';
import { IoBagCheckOutline } from 'react-icons/io5';
import { MdOutlineFormatColorFill } from 'react-icons/md';
import { FaFileInvoice, FaUsers } from 'react-icons/fa';
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
            { id: 'colorsMenu', title: 'Colors', icon: MdOutlineFormatColorFill, path: '/colors', roles: ['admin', 'superadmin', 'moderator'] },
            // { id: 'productsMenu', title: 'Products', icon: MdInventory2, path: '/products', roles: ['admin', 'superadmin', 'moderator'] },
        ],
    },

    {
        id: 'managementMenu',
        type: 'Management',
        menus: [
            { id: 'adminusersmenu', title: 'Users', icon: MdAdminPanelSettings, path: '/users', roles: ['admin', 'superadmin'] },
            // { id: 'customersmenu', title: 'Customers', icon: FaUsers, path: '/customers' },
            // { id: 'ordersMenu', title: 'Orders', icon: IoBagCheckOutline, path: '/orders' },
            // { id: 'invoiceMenu', title: 'Invoices', icon: FaFileInvoice, path: '/invoices' },
        ],
    },
];
