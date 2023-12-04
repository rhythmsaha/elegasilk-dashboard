import { MdManageAccounts, MdSpeed } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { BiBell, BiCategory } from 'react-icons/bi';
import { IoDocumentText } from 'react-icons/io5';
import { FaUserFriends } from 'react-icons/fa';
import { BsFillCartFill } from 'react-icons/bs';

export const sidebarConfig = [
    {
        id: 'generalmenu',
        type: 'General',
        menus: [
            {
                id: 'dashboardlink',
                title: 'Dashboard',
                icon: MdSpeed,
                path: '/',
            },
        ],
    },

    {
        id: 'managementMenu',
        type: 'Management',
        menus: [
            {
                id: 'adminusersmenu',
                title: 'Users',
                icon: MdManageAccounts,
                path: '/users',
                roles: ['admin', 'superadmin'],
            },

            // {
            //     id: 'customersmenu',
            //     title: 'Customers',
            //     icon: FaUserFriends,
            //     path: '/customers',
            // },

            {
                id: 'categoriesmenu',
                title: 'Categories',
                icon: BiCategory,
                path: '/categories',
            },

            // {
            //     id: 'link3',
            //     title: 'Products',
            //     icon: BsFillCartFill,
            //     path: '/products',
            // },

            // {
            //     id: 'link4',
            //     title: 'Orders',
            //     icon: IoDocumentText,
            //     path: '/invoices',
            // },
        ],
    },
];
