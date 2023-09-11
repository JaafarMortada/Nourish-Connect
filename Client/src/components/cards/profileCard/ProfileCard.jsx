import {
    Card,
    Typography,
    CardBody,
    Avatar,
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

const ProfileCard = () => {
    const { store } = useStoreData()
    const [newLogo, setNewLogo] = useState(null);
    const [existingLogo, setExistingLogo] = useState(null);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setNewLogo(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogoUpload = async () => {

    }

    return (
        <>

            <Card className="flex flex-col md:min-h-[50%] min-h-[80vh] md:w-[95%] w-[400px]">

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
                                Jaafar Mortada
                            </Typography>
                            <Typography color="gray" className="font-normal ">
                                Manager at a supermarket
                            </Typography>
                        </div>
                        <div className="flex h-full lg:flex-row flex-col ">
                            <div className="flex-wrap flex lg:flex-row flex-col gap-10 items-center">
                                <UserInfoCard
                                    icon={<EnvelopeIcon />}
                                    title={"Email"}
                                    info={['jaafar@mail.com']}
                                />

                                <UserInfoCard
                                    icon={<MapPinIcon />}
                                    title={"Location"}
                                    info={['Latitude: 50', 'longitude: 50']}
                                />
                                <UserInfoCard
                                    icon={<BiSolidDonateHeart className="w-8 h-8" />}
                                    title={"Donations"}
                                    info={['Delivered: 10']}
                                />
                            </div>
                        </div>
                    </div>
                </CardBody>

            </Card>

        </>
    )
}

export default ProfileCard