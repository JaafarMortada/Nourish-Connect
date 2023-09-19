import {
    Dialog,
    DialogHeader,
    DialogBody,
    Typography,
    DialogFooter,
    Spinner,
} from "@material-tailwind/react";

import TextAreaField from "../../ui/TextAreaField";
import PrimaryButton from "../../ui/Button";
import { useState } from "react";
import { sendRequest } from "../../../config/request";
import moment from "moment";
const ApproveDiscount = ({ open, handleOpen, data, removeApproved }) => {

    const [error, setError] = useState(false)
    const [approving, setApproving] = useState(false)

    const [description, setDescription] = useState('')

    const handleError = () => {
        setError(true)
        setTimeout(() => {
            setError(false);
            setApproving(false)
        }, 3000)
    }

    const approveDiscount = async () => {
        setApproving(true)
        try {
            const response = await sendRequest({
                method: "POST",
                route: `/api/manager/approve_discount/${data.discount_suggestion_id}`,
                body: {description},

            });
            if (response.message === "success") {
                setApproving(false)
                removeApproved(data.discount_suggestion_id)
                handleOpen()
            } else {
                handleError()
            }
        } catch (error) {
            console.log(error);
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
                    Thank you for your generous contribution. Before proceeding, we kindly request your approval to finalize the discount.
                    <br /> Below are the details of your discount:
                </Typography>
                <Typography className="text-[16px] ml-5 my-5 text-[--text-black]">
                    <li className="truncate">
                        <span className="font-bold">Item: </span> {data.item_name}
                    </li>
                    <li className="truncate">
                        <span className="font-bold">Quantity left: </span> {data.available_quantity} out of {data.initial_quantity}
                    </li>
                    <li className="truncate">
                        <span className="font-bold">Suggested discount percentage: </span> {data.suggested_discount_percentage}
                    </li>
                    <li className="truncate">
                        <span className="font-bold">Discount valid until: </span> {moment(data.suggested_end_date).format('L')} <span>(Two days before expiry date)</span>
                    </li>
                    {
                        data.current_discounts_percentage === 0 ?
                            <li className="truncate ">

                                <span className="font-bold italic">No active discounts on this item </span>

                            </li>
                            : <li className="truncate marker:text-red-500">
                                <span className={`font-bold italic  text-red-500`}>This item is currently under {data.current_discounts_percentage * 100}% discount </span>

                            </li>

                    }
                </Typography>
                <TextAreaField 
                    label={"Write a brief description for this discount"}
                    onChange={(e)=>{
                        setDescription(e.target.value)
                    
                    }}
                />
            </DialogBody>
            <DialogFooter className="border-t-2">
                <PrimaryButton
                    label={approving ? <Spinner /> : "Approve"}
                    disabled={approving}
                    classNames={`min-w-[107px] flex justify-center ${error ? "bg-red-500" : "bg-[--primary]"}`}
                    onClick={approveDiscount}
                />
            </DialogFooter>
        </Dialog>
    );
}

export default ApproveDiscount