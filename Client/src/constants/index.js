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

import {
    gpt,
    gift,
    shoppingBag,
    chart,
    inbox,
    testimonial1,
    testimonial3,
    testimonial2,

} from "../assets";

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
    pageContainer: "flex flex-col flex-1 h-[100vh] overflow-auto min-w-[500px] items-center ",
    boxWidth: "xl:max-w-[1280px] w-full",
    paddingX: "sm:px-16 px-6",
    flexCenter: "flex justify-center items-center",
    flexStart: "flex justify-center items-start",
    section: "flex md:flex-row flex-col sm:py-16 py-6",
};


export const inventoryUploadConditions = [
    {
        id: 'inventoryConditionsTitle',
        text: 'Before Uploading Please make sure that the file contains the data listed below:'
    },
    {
        id: 'inventory-condition-1',
        text: 'Item’s Name'
    },
    {
        id: 'inventory-condition-2',
        text: 'item’s Stock Price as well as the retail price and the quantity'
    },
    {
        id: 'inventory-condition-3',
        text: 'item’s category'
    },
    {
        id: 'inventory-condition-4',
        text: 'item’s barcode'
    },
    {
        id: 'inventory-condition-5',
        text: 'item’s production and expiry date'
    }

]

export const POSuploadConditions = [
    {
        id: 'POSConditionsTitle',
        text: 'Before Uploading Please make sure that the file contains the data listed below:'
    },
    {
        id: 'POS-condition-1',
        text: 'Item’s Name'
    },
    {
        id: 'POS-condition-2',
        text: 'item’s barcode'
    },
    {
        id: 'POS-condition-3',
        text: 'Sold quantity'
    },

]

export const navLinks = [
    {
        id: "home",
        title: "Home",
    },
    {
        id: "features",
        title: "Features",
    },
    {
        id: "testimonials",
        title: "Testimonials",
    },
    {
        id: "signin",
        title: "Sign in",
    },
];

export const foodWasteFacts = [
    "Food waste is a staggering global challenge, with more than one-third of all food produced worldwide going to waste annually. This widespread issue not only results in significant economic losses but also poses severe environmental threats.",
    "One of the most concerning consequences of food waste is its role in climate change. The food discarded contributes to 8% of the world's greenhouse gas emissions, making it a critical factor in the ongoing battle against global warming.",
    "In developed countries, consumers are responsible for discarding nearly 40% of perfectly edible food, which compounds food insecurity problems and exacerbates the broader waste-related issues.",
    "The wasteful disposal of food places enormous pressure on essential resources such as water, land, and energy. This overuse of resources intensifies ecological challenges and threatens the sustainability of our planet.",
    "Each year, an astonishing 1.3 billion tons of food are wasted worldwide, equivalent to one-third of the world's total food production. These numbers underscore the urgency of addressing food waste on a global scale.",
    "Another concerning aspect of food waste is its link to deforestation. Often, land is cleared for agricultural purposes, yet the resulting food is never consumed, contributing to the loss of vital forests.",
    "The decomposition of food waste in landfills releases methane, a potent greenhouse gas that significantly contributes to global warming. This process underscores the urgency of tackling food waste on multiple fronts.",
    "On a global scale, nearly one-third of food produced for human consumption is either lost or wasted, even as millions of people go hungry every day. This stark disparity highlights the need for more sustainable food management.",
    "Food waste also represents a substantial economic loss, estimated at over $1 trillion annually, affecting businesses and economies worldwide. Reducing food waste is not just an ethical choice; it's a sound economic decision.",
    "A modest reduction of just 25% in food waste could provide enough food to feed the entire global population. This reduction would not only help address hunger but also make a significant impact on waste-related challenges."
];

export const features = [
    {
        icon: gpt,
        title: 'AI Suggestions',
        description: 'Harness the potential of cutting-edge artificial intelligence as our platform generates proactive, data-backed suggestions for surplus redistribution and strategic discounts.',
    },
    {
        icon: gift,
        title: 'Charity Collaboration',
        description: 'Forge meaningful partnerships with local charities through our seamless communication channels, facilitating transparent, efficient surplus food donations that make a difference.',
    },
    {
        icon: shoppingBag,
        title: 'Cashier Integration',
        description: 'Simplify cashier workflows with our integrated point-of-sale system. Cashiers easily upload inventory data through user-friendly forms or file submissions, ensuring accurate inventory management and reducing errors.',
    },
    {
        icon: chart,
        title: 'Dashboard Insights',
        description: "Access personalized dashboards presenting donation data, weekly revenue, and top products . Visual summaries empower informed decisions and track your store's positive environmental and social impact.",
    },
    {
        icon: inbox,
        title: 'Realtime Chatting',
        description: "Facilitate seamless communication between your supermarket and local charities through our integrated chat feature. This user-friendly platform allows you to connect, coordinate, and discuss surplus food donations effortlessly. It streamlines the process of responding to donation requests, ensuring that nutritious food reaches those in need promptly. ",
    },


]

export const testimonials = [
    {
        name: "Sarah Johnson",
        title: "Store Manager",
        company: "FreshGroceries Supermarket",
        image: testimonial1,
        content: "Using this platform has been a game-changer for our supermarket. We've significantly reduced food waste and made a meaningful impact in our community by easily donating surplus items. The AI suggestions have been incredibly accurate, and the charity collaboration feature has streamlined the donation process. Plus, the dashboard insights provide us with valuable data for optimizing our operations. It's a win-win!"
    },
    {
        name: "David Rodriguez",
        title: "Executive Director",
        company: "Helping Hands Foundation",
        image: testimonial2,
        content: "Partnering with supermarkets through this platform has been a blessing for our charity. It's simplified the way we connect with supermarkets and receive donations. The system is user-friendly, and the communication channels are efficient. We can now ensure that nutritious food reaches those in need promptly. Kudos to the team behind this fantastic initiative!"
    },
    {
        name: "Mark Turner",
        title: "Head Cashier",
        company: "ValueMart Superstore",
        image: testimonial3,
        content: "As a cashier, I appreciate the simplicity of the platform's cashier integration. Uploading inventory data is a breeze, and the point-of-sale system is intuitive. It's made my job smoother and more accurate. Our store's commitment to reducing food waste is evident, and it feels great to be a part of it."
    }
];
