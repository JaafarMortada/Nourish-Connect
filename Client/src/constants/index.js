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

export const emptyStore = {
    token: '',
    usertype: '',
    usertype_id: '',
    email: '',
    user_id: '',
    username: '',
    pic_url: null,
    
}

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

export const styles = {
    pageHeaderText: "w-[95%] text-[27px] font-semibold my-5 flex justify-between",
    pageContainer: "flex flex-col flex-1 h-[100vh] overflow-auto min-w-[500px] items-center "

  };


export const inventoryUploadConditions = [
    {
        id:'inventoryConditionsTitle',
        text: 'Before Uploading Please make sure that the file contains the data listed below:'
    },
    {
        id:'inventory-condition-1',
        text: 'Item’s Name'
    },
    {
        id:'inventory-condition-2',
        text: 'item’s Stock Price as well as the retail price and the quantity'
    },
    {
        id:'inventory-condition-3',
        text: 'item’s category'
    },
    {
        id:'inventory-condition-4',
        text: 'item’s barcode'
    },
    {
        id:'inventory-condition-5',
        text: 'item’s production and expiry date'
    }

]

export const POSuploadConditions = [
    {
        id:'POSConditionsTitle',
        text: 'Before Uploading Please make sure that the file contains the data listed below:'
    },
    {
        id:'POS-condition-1',
        text: 'Item’s Name'
    },
    {
        id:'POS-condition-2',
        text: 'item’s barcode'
    },
    {
        id:'POS-condition-3',
        text: 'Sold quantity'
    },
    
]