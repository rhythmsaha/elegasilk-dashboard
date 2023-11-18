import { MdSpeed } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { BiBell, BiCategory } from "react-icons/bi";
import { IoDocumentText } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { BsFillCartFill } from "react-icons/bs";

export const sidebarConfig = [
    {
        id: "menu1",
        type: "General",
        menus: [{ id: "link1", title: "Dashboard", icon: MdSpeed, path: "/" }],
    },

    {
        id: "menu2",
        type: "Management",
        menus: [
            { id: "link5", title: "Users", icon: FaUserFriends, path: "/users" },
            { id: "link2", title: "Categories", icon: BiCategory, path: "/categories" },
            { id: "link3", title: "Products", icon: BsFillCartFill, path: "/products" },
            { id: "link4", title: "Orders", icon: IoDocumentText, path: "/invoices" },
        ],
    },
];
