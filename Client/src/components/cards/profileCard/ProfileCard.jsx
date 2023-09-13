import {
    Card,
    Typography,
    CardBody,
    Avatar,
    Spinner,
} from "@material-tailwind/react";
import { BiSolidDonateHeart } from 'react-icons/bi'
import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useStoreData } from "../../../global/store";
import { sendRequest } from "../../../config/request";
import PrimaryButton from "../../ui/Button";
import { default_profile_pic } from "../../../assets";
import UserInfoCard from "../miniCards/UserInfoCard";
import InputField from "../../ui/Input";
import Unauthorized from "../../../Pages/Unauthorized";

const ProfileCard = () => {
    const { store } = useStoreData()
    const [newLogo, setNewLogo] = useState(null)
    const [existingLogo, setExistingLogo] = useState(null)
    const [profileData, setProfileData] = useState({})
    const [loading, setLoading] = useState(true)
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
                    setIsUnauthorized(true)
                }
            } catch (error) {
                console.log(error);
                setIsUnauthorized(true)

            }
        }
        getProfile()
    }, [])

    const handleLogoUpload = async () => {
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

                <Card
                    className={`flex flex-col md:min-h-[50%] min-h-[80vh] md:w-[95%] w-[400px] ${loading ? "justify-center items-center" : ""}`}
                >

                    {loading ? <Spinner className="w-20 h-20" /> :
                        <CardBody className="overflow-scroll px-5 flex-1 flex md:flex-row flex-col justify-between items-center md:gap-0 gap-10">
                            <div className="w-[300px] h-fit flex flex-col items-center justify-center gap-10">
                                <Avatar
                                    src={newLogo ? newLogo :
                                        existingLogo ? existingLogo :
                                            default_profile_pic
                                    }
                                    withBorder={true}
                                    className="w-[200px] h-[200px] border-[--primary]"
                                />
                                {
                                    newLogo ?
                                        <div className="flex gap-5">
                                            <PrimaryButton
                                                label={"Cancel"}
                                                classNames={"bg-[--primary] w-[100px]"}
                                                onClick={() => setNewLogo(null)}
                                            />
                                            <PrimaryButton
                                                label={"Confirm"}
                                                classNames={"bg-[--primary] w-[100px]"}
                                                onClick={handleLogoUpload}
                                            />
                                        </div>

                                        :
                                        <InputField
                                            type={"file"}
                                            label={"Upload or Edit your logo"}
                                            onChange={handleLogoChange}
                                            error={false}
                                        />
                                }

                            </div>
                            <div className="w-[65%] flex flex-col h-full gap-5">
                                <div className="w-full">
                                    <Typography variant="h3" color="black">
                                        {profileData.username}
                                    </Typography>
                                    <Typography color="gray" className="font-normal ">
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
                            </div>
                        </CardBody>}
                </Card>
            </>
    )
}

export default ProfileCard