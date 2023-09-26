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
    Spinner,
} from "@material-tailwind/react";

import { ChevronDownIcon, PowerIcon } from "@heroicons/react/24/outline";
import { default_profile_pic, logoWhite } from "../../assets";
import {
    baseStorageURL,
    emptyStore,
    sidebarCashierLinks,
    sidebarCharityLinks,
    sidebarManagerLinks,
    sidebarProfileLinks,
} from "../../constants";
import ProfileOverview from "../modals/profileOverview/ProfileOverview";
import { useStoreData } from "../../global/store";
import { sendRequest } from "../../config/request";

const Sidebar = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(0);
    const [openProfile, setOpenProfile] = useState(false);

    const handleOpenProfile = () => setOpenProfile(!openProfile);
    const { store, setStoreData } = useStoreData();

    const sidebarLinks =
        store.usertype === "manager"
            ? sidebarManagerLinks
            : store.usertype === "cashier"
                ? sidebarCashierLinks
                : store.usertype === "charity" ?
                    sidebarCharityLinks
                    : [];

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const handleLogout = async () => {
        try {
            const response = await sendRequest({
                method: "POST",
                route: "/api/auth/logout",
            });
            if (response.message === "Successfully logged out") {
                localStorage.clear()
                setStoreData(emptyStore)
                localStorage.clear()
                navigate(`/`)
            }
        } catch (error) {
            
        }
    }

    return (
        <>
            <ProfileOverview open={openProfile} handleOpen={handleOpenProfile} />
            <Card className="h-[100vh] rounded-none w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-[--background-black] overflow-auto">
                <div className="mb-2 p-4">
                    <img src={logoWhite} alt="Nourish Connect Logo"/>
                </div>
                <hr className="my-2 border-[--text-gray]" />
                <List>
                    {
                        sidebarLinks.length === 0 ? <Spinner className="w-10 h-10 self-center" /> :
                            sidebarLinks.map((Link, index) =>
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
                                    src={store.pic_url ? `${baseStorageURL}${store.pic_url}` : default_profile_pic}
                                    className="min-h-12 min-w-12 max-h-12 max-w-12 p-0.5 bg-[--primary]"
                                    alt={`${store.username}'s profile picture`}
                                />
                            </ListItemPrefix>
                            <div className="max-w-[125px] truncate">
                                <span className="text-[21px]">{store.username}</span>
                                <br />
                                <span className="text-[16px]">{store.company_name}</span>
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
                                            onClick={Link.id === "logout" ? handleLogout : handleOpenProfile}
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
        </>
    );
};

export default Sidebar;
