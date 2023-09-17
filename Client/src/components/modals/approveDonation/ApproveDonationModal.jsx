
import {
    Card,
    Dialog,
    DialogHeader,
    DialogBody,
    Typography,
    CardBody,
    DialogFooter,
} from "@material-tailwind/react";

import PrimaryButton from "../../ui/Button";
import { useState } from "react";
import { sendRequest } from "../../../config/request";

const ApproveDonation = ({ open, handleOpen, data }) => {

    const [error, setError] = useState(false)

    const handleError = () => {
        setError(true)
        setTimeout(() => {
            setError(false);
        }, 3000)
    }


    return (

        <Dialog
            className="flex flex-col overflow-scroll"
            size="md"
            open={open}
            handler={handleOpen}
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
            }}
        >
            <DialogHeader floated={false} shadow={false} className="rounded-none border-b-2">
                <div className="h-fit flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Approve Donation
                        </Typography>
                    </div>
                </div>

            </DialogHeader>

            <DialogBody className="flex flex-wrap overflow-scroll flex-col">
                <Typography variant="h6" color="blue-gray">
                    Thank you for your generous contribution. Before proceeding, we kindly request your approval to finalize the donation process.
                    <br />The details of your donation are listed below.
                </Typography>
                <Typography className="text-[16px] ml-5 my-5">
                    <li className="truncate">
                        <span className="font-bold">Charity: </span> {data.charity_name}
                    </li>
                    <li className="truncate">
                        <span className="font-bold">Item: </span> {data.item_name}
                    </li>
                    <li className="truncate">
                        <span className="font-bold">Requested Quantity: </span> {data.requested_quantity}
                    </li>
                    <li className="truncate">
                        <span className="font-bold">Quantity to donate: </span> {data.quantity_to_donate}
                    </li>
                </Typography>
            </DialogBody>
            <DialogFooter className="border-t-2">
                <PrimaryButton
                    label={"Approve"}
                    classNames={"bg-[--primary]"}
                />
            </DialogFooter>
        </Dialog>
    );
}

export default ApproveDonation