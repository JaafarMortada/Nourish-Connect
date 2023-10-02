
import {
    Dialog,
    DialogHeader,
    DialogBody,
    Typography,
    Spinner,
} from "@material-tailwind/react";

import PrimaryButton from "../../ui/Button";
import InputField from "../../ui/Input";
import TextAreaField from "../../ui/TextAreaField";
import { useState } from "react";
import { sendRequest } from "../../../config/request";
import { useStoreData } from "../../../global/store";

const RequestDonation = ({open, handleOpen, handleNewRequest}) => {

    const [data, setData] = useState({
        title: "",
        category: "",
        description: "",
        quantity: "",

    })

    const { store } = useStoreData()

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleDataChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleError = () => {
        setError(true)
        setTimeout(() => {
            setError(false);
        }, 3000)
    }

    const handleSendDonationRequest = async () => {
        setLoading(true)
        try {
            const response = await sendRequest({
                method: "POST",
                route: "/api/charity/request_donation",
                body: data,

            });
            if (response.message === "success") {
                handleNewRequest(response.donationRequest)
                setData({
                    title: "",
                    description: "",
                    quantity: "",
                    category: "",
                })
                handleOpen()
                setLoading(false)
            } else {
                setLoading(false)
                handleError()
            }
        } catch (error) {
            setLoading(false)
            handleError()
        }
    }

    return (

        <Dialog 
            className="flex flex-col overflow-scroll"
            size="xl"
            open={open}
            handler={handleOpen}
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
            }}
            // className="overflow-scroll"
            >
            <DialogHeader className="rounded-none ">
                <div className="mb-4 h-fit flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Request A Donation
                        </Typography>
                    </div>
                </div>

            </DialogHeader>

            <DialogBody className="flex flex-wrap overflow-scroll px-0  justify-center lg:flex-row flex-col">
                <div className="w-[full] flex-1 flex flex-col items-center gap-10 overflow-scroll">
                    <div className="flex gap-10 lg:flex-row flex-col pt-5">
                        <div className="lg:w-[280px] w-[200px]">
                            <InputField
                                label={"Request's Title"}
                                name={"title"}
                                value={data.name}
                                onChange={handleDataChange}
                            />
                        </div>
                        <div className="lg:w-[280px] w-[200px]">
                            <InputField
                                label={"Food Category"}
                                name={"category"}
                                value={data.category}
                                onChange={handleDataChange}
                            />
                        </div>
                        <div className="lg:w-[280px] w-[200px]">
                            <InputField
                                label={"Quantity Needed"}
                                name={"quantity"}
                                value={data.quantity}
                                onChange={handleDataChange}
                            />
                        </div>
                    </div>

                    <div className="lg:w-[920px] w-[200px] flex  lg:flex-row flex-col justify-center items-center gap-20">
                        <TextAreaField
                            label={"Description"}
                            name={"description"}
                            value={data.description}
                            onChange={handleDataChange}
                        />
                    </div>
                    
                    <div className="flex lg:justify-end justify-center lg:w-[920px] w-[200px] max-h-[40px]">
                        <PrimaryButton
                            label={error ? "An error occurred" : loading ? <Spinner /> : "Send Request"}
                            classNames={`w-[200px] ${error ? "bg-red-500" : "bg-[--primary]"}`}
                            onClick={handleSendDonationRequest}
                            disabled={loading}
                        />
                    </div>
                </div>
            </DialogBody>
        </Dialog>
    );
}

export default RequestDonation