import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    GiftIcon,
    ReceiptPercentIcon,
    UserCircleIcon,
    MapIcon,
    InboxIcon,
    PowerIcon,
    ArchiveBoxIcon,

} from "@heroicons/react/24/solid";


export const sidebarManagerLinks = [
    {
        id: "dashboard",
        text: "Dashboard",
        icon: PresentationChartBarIcon,

    },
    {
        id: "cashiers",
        text: "Cashiers",
        icon: ShoppingBagIcon,

    },
    {
        id: "donations",
        text: "Donations",
        icon: GiftIcon,

    },
    {
        id: "discounts",
        text: "Discounts",
        icon: ReceiptPercentIcon,

    },
    {
        id: "separator",
    },
    {
        id: "chats",
        text: "Chats",
        icon: InboxIcon,

    },
    {
        id: "map",
        text: "Map",
        icon: MapIcon,

    },
];

export const sidebarCashierLinks = [
    {
        id: "point-of-sales",
        text: "Point Of Sales",
        icon: ShoppingBagIcon,

    },
    {
        id: "inventory",
        text: "Inventory",
        icon: ArchiveBoxIcon,

    },

];

export const sidebarCharityLinks = [
    {
        id: "donations",
        text: "Donations",
        icon: GiftIcon,

    },
    {
        id: "chats",
        text: "Chats",
        icon: InboxIcon,

    },

];

export const sidebarProfileLinks = [
    {
        id: "profile",
        text: "Profile",
        icon: UserCircleIcon,

    },
    {
        id: "logout",
        text: "Logout",
        icon: PowerIcon,

    },
]