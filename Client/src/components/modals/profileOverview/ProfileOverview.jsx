import {
    Card,
    CardBody,
    Avatar,
    Spinner,
    Dialog,
    DialogHeader,
    DialogBody,
    Typography,
    DialogFooter,
} from "@material-tailwind/react";
import { BiSolidDonateHeart } from 'react-icons/bi'
import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useStoreData } from "../../../global/store";
import { sendRequest } from "../../../config/request";
import PrimaryButton from "../../ui/Button";
import { default_profile_pic } from "../../../assets";
import UserInfoCard from "../../cards/miniCards/UserInfoCard";
import InputField from "../../ui/Input";
import Unauthorized from "../../../Pages/Unauthorized";
import Map from "../../map/Map";
const ProfileOverview = ({ open, handleOpen }) => {
    const { store } = useStoreData()
    const [newLogo, setNewLogo] = useState(null)
    const [existingLogo, setExistingLogo] = useState(null)
    const [profileData, setProfileData] = useState({})
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [isUnauthorized, setIsUnauthorized] = useState()
    const [imageFile, setImageFile] = useState(null)
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file)
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setNewLogo(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await sendRequest({
                    method: "GET",
                    route: "/api/manager_charity/profile/get_profile",
                    token: store.token,
                });
                if (response.message === "success") {
                    setProfileData(response.profile);
                    if (response.profile.pic_url) {
                        setExistingLogo(`http://127.0.0.1:8000/storage/${response.profile.pic_url}`)
                    }
                    setLoading(false)
                } else if (response.message === "Unauthorized") {
                    // setIsUnauthorized(true)
                }
            } catch (error) {
                console.log(error);
                // setIsUnauthorized(true)

            }
        }
        getProfile()
    }, [])

    const handleLogoUpload = async () => {
        setUploading(true)
        try {
            const formData = new FormData();
            formData.append("image", imageFile);
            const response = await sendRequest({
                method: "POST",
                route: "/api/manager_charity/profile/edit_profile",
                token: store.token,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });
            if (response.message === "success") {
                setExistingLogo(newLogo)
                setNewLogo(null)
            } else if (response.message === "Unauthorized") {
                setIsUnauthorized(true)
            }
        } catch (error) {
            console.log(error);

        }
    }

    return (
        isUnauthorized ? <Unauthorized /> :
            <>

                <Dialog
                    className={`flex flex-col overflow-scroll min-h-[80vh] relative max-h-[80vh] ${loading ? "justify-center items-center" : ""}`}
                    size="md"
                    open={open}
                    handler={handleOpen}
                    animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                    }}

                >
                    <DialogHeader floated={false} shadow={false} className="rounded-none absolute top-0 left-0">
                        <div className="mb-4 h-fit flex items-center justify-between gap-8">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    Profile Overview
                                </Typography>
                            </div>
                        </div>

                    </DialogHeader>
                    {loading ? <Spinner className="w-20 h-20" /> :
                        <DialogBody className="overflow-scroll px-5 flex-1 mt-10 flex-col justify-center items-center md:gap-0 gap-10">
                            <div className="min-w-[300px] h-fit relative flex flex-col items-center justify-center gap-10">
                                <label>

                                    <Avatar
                                        src={newLogo ? newLogo :
                                            existingLogo ? existingLogo :
                                                default_profile_pic
                                        }
                                        title="Click here to edit your profile picture."
                                        withBorder={true}
                                        className="w-[200px] h-[200px] border-[--primary] border-4 cursor-pointer hover:scale-105 transition-all"
                                    />
                                    <input type="file" className="hidden" onChange={handleLogoChange} />

                                </label>


                                {
                                    newLogo ?
                                        <div className="flex flex-col absolute right-0 items-center justify-center gap-5 h-full w-[50%]">
                                            <PrimaryButton
                                                label={"Cancel"}
                                                classNames={"bg-[--primary] w-[100px] min-h-[40px] flex justify-center items-center p-0"}
                                                onClick={() => setNewLogo(null)}
                                                disabled={uploading}
                                            />
                                            <PrimaryButton
                                                label={uploading ? <Spinner /> : "Confirm"}
                                                classNames={"bg-[--primary] w-[100px] flex min-h-[40px] justify-center items-center p-0 "}
                                                onClick={handleLogoUpload}
                                                disabled={uploading}
                                            />
                                        </div>

                                        :
                                        null
                                }

                            </div>
                            <div className="w-full flex flex-col items-center h-full gap-5 mt-5">
                                <div className="w-full text-center">
                                    <Typography variant="h3" color="black">
                                        {profileData.username}
                                    </Typography>
                                    <Typography variant="h5" color="gray" className="font-normal ">
                                        {`${store.usertype === 'manager' ? "Manager" : store.usertype === 'charity' ? 'Coordinator' : ''}`} at a {profileData.company_name}
                                    </Typography>
                                </div>
                                <div className="flex h-full lg:flex-row flex-col ">
                                    <div className="flex-wrap flex lg:flex-row flex-col gap-10 items-center">
                                        <UserInfoCard
                                            icon={<EnvelopeIcon />}
                                            title={"Email"}
                                            info={[profileData.email]}
                                        />

                                        {/* <UserInfoCard
                                            icon={<MapPinIcon />}
                                            title={"Location"}
                                            info={[`Latitude: ${profileData.latitude}`, `longitude: ${profileData.longitude}`]}
                                        /> */}
                                        <UserInfoCard
                                            icon={<BiSolidDonateHeart className="w-8 h-8" />}
                                            title={"Donations"}
                                            info={[`${store.usertype === 'manager' ? "Delivered" : store.usertype === 'charity' ? 'Received' : ''}: ${profileData.donations_count}`]}
                                        />
                                    </div>
                                </div>

                                <div className="border-b-4 border-[--primary] rounded-t-lg max-w-[70%] min-w-[70%] self-center">
                                    <Typography className="my-2 text-[16px]">
                                        Location
                                    </Typography>
                                    <Map
                                        styles={" !min-h-[250px] rounded-t-lg"}
                                        draggable={true}
                                        locateUser={true}
                                        zoomCenter={[profileData.latitude, profileData.longitude]}
                                        profile={profileData}
                                    />
                                </div>
                            </div>
                            {/* <div className="h-[500px] w-[500px]">
                                <Map profile={profileData} zoomCenter={[profileData.latitude, profileData.longitude]} />
                            </div> */}

                        </DialogBody>}
                </Dialog>
            </>
    )
}

export default ProfileOverview