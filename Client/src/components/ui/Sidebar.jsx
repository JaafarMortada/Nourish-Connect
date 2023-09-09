import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

import { ChevronDownIcon, PowerIcon } from "@heroicons/react/24/outline";
import { default_profile_pic, logoWhite } from "../../assets";
import {
    emptyStore,
    sidebarCashierLinks,
    sidebarCharityLinks,
    sidebarManagerLinks,
    sidebarProfileLinks,
} from "../../constants";

import { useStoreData } from "../../global/store";

const Sidebar = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(0);

    const { store, setStoreData } = useStoreData();

    const sidebarLinks =
        store.usertype === "manager"
            ? sidebarManagerLinks
            : store.usertype === "cashier"
                ? sidebarCashierLinks
                : sidebarCharityLinks;

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const handleLogout = () => {
        setStoreData(emptyStore)
        navigate(`/auth/login`)
    }   

    return (
        <Card className="h-[100vh] rounded-none w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-[--background-black] overflow-auto">
            <div className="mb-2 p-4">
                <img src={logoWhite} />
            </div>
            <hr className="my-2 border-blue-gray-500" />
            <List>
                {sidebarLinks.map((Link, index) =>
                    Link.id === "separator" ? (
                        <hr className="my-2 border-[--text-gray]" key={index} />
                    ) : (
                        <ListItem
                            key={`${Link.id}-${index}`}
                            onClick={() => navigate(`/${store.usertype}/${Link.id}`)}
                            className="text-[--text-gray]"
                        >
                            <ListItemPrefix>
                                <Link.icon className="h-5 w-5" />
                            </ListItemPrefix>
                            {Link.text}
                        </ListItem>
                    )
                )}
            </List>

            <div className="absolute bottom-0 left-0 w-[290px] px-4 bg-black py-4">
                <Accordion
                    open={open === 1}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 text-[--primary]  transition-transform ${open === 1 ? "rotate-180" : ""
                                }`}
                        />
                    }
                >
                    <ListItem
                        className="p-3 bg-black text-[--text-gray]"
                        selected={open === 1}
                        onClick={() => handleOpen(1)}
                    >
                        <ListItemPrefix>
                            <Avatar
                                src={default_profile_pic}
                                className="h-12 w-12 p-0.5 bg-[--primary]"
                            />
                        </ListItemPrefix>
                        <div>
                            <span className="text-[21px]">Username</span>
                            <br />
                            <span className="text-[16px]">Company name</span>
                        </div>

                        {store.usertype === "cashier" 
                            ? 
                                <PowerIcon 
                                    className="absolute right-2 top-auto w-5 border-b-0 text-[--primary]"
                                    onClick={handleLogout}
                                /> 
                            : 
                            (
                                <AccordionHeader className="absolute right-5 top-auto w-5 border-b-0 text-[--text-gray]" >{''}</AccordionHeader>
                            )
                        }

                    </ListItem>
                    <hr className="my-2 border-[--text-gray]" />

                    {store.usertype === "cashier" ? null : (
                        <AccordionBody className="py-1">
                            <List className="p-0">

                                {sidebarProfileLinks.map((Link, index) => (
                                    <ListItem
                                        key={`${Link.id}-${index}`}
                                        onClick={Link.id === "logout" ? handleLogout : () => navigate(`/${store.usertype}/${Link.id}`)}
                                        className="text-[--text-gray]"
                                    >
                                        <ListItemPrefix>
                                            <Link.icon className="h-5 w-5" />
                                        </ListItemPrefix>
                                        {Link.text}
                                    </ListItem>
                                ))}

                            </List>
                        </AccordionBody>
                    )}

                </Accordion>
            </div>
        </Card>
    );
};

export default Sidebar;
