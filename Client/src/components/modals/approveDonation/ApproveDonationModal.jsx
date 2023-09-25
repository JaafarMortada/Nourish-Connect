import {
    Dialog,
    DialogHeader,
    DialogBody,
    Typography,
    DialogFooter,
    Spinner,
} from "@material-tailwind/react";

import PrimaryButton from "../../ui/Button";
import { useState } from "react";
import { sendRequest } from "../../../config/request";
import { websocketRequest } from "../../../config/websocketRequest";
import { useStoreData } from "../../../global/store";

const ApproveDonation = ({ open, handleOpen, data, removeApproved }) => {

    const { store } = useStoreData()
    const [error, setError] = useState(false)
    const [approving, setApproving] = useState(false)

    const handleError = () => {
        setError(true)
        setTimeout(() => {
            setError(false);
            setApproving(false)
        }, 3000)
    }

    const approveDonation = async () => {
        setApproving(true)
        try {
            const response = await sendRequest({
                method: "GET",
                route: `/api/manager/approve_donation/${data.suggestion_id}`,
            });
            if (response.message === "success") {
                setApproving(false)
                removeApproved(data.suggestion_id)
                websocketRequest({
                    receiver_id: response.test.receiver_id,
                    WSevent: "donation"
                })
                websocketRequest({
                    inventoryId: store.inventory_id,
                    WSevent: "items"
                })
                websocketRequest({
                    inventoryId: store.inventory_id,
                    WSevent: "user-donation"
                })
                handleOpen()
            } else {
                handleError()
            }
        } catch (error) {
            
            handleError()
        }
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
            <DialogHeader className="rounded-none border-b-2">
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
                <Typography className="text-[16px] ml-5 my-5 text-[--text-black]">
                    <li className="truncate">
                        <span className="font-bold">Charity: </span> {data.charity_name}
                    </li>
                    <li className="truncate">
                        <span className="font-bold">Description (Context written by the charity):<br /> </span>
                    </li>
                    <div className="max-w-full max-h-40 whitespace-normal text-justify px-10 my-3 overflow-scroll">
                        
                            {data.request_description}

                        
                    </div>

                    <li className="truncate">
                        <span className="font-bold">Suggested item: </span> {data.item_name}
                    </li>
                    <li className="truncate">
                        <span className="font-bold">Requested quantity: </span> {data.requested_quantity}
                    </li>
                    <li className="truncate">
                        <span className="font-bold">Quantity to donate: </span> {data.quantity_to_donate}
                    </li>
                </Typography>
            </DialogBody>
            <DialogFooter className="border-t-2">
                <PrimaryButton
                    label={approving ? <Spinner /> : "Approve"}
                    disabled={approving}
                    classNames={`min-w-[107px] flex justify-center ${error ? "bg-red-500" : "bg-[--primary]"}`}
                    onClick={approveDonation}
                />
            </DialogFooter>
        </Dialog>
    );
}

export default ApproveDonation