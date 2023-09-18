import {
    Card,
    CardBody,
    Typography,
    Button,

} from "@material-tailwind/react";
import { useState } from "react";
import moment from "moment";
import ApproveDiscount from "../../modals/approveDiscount/ApproveDiscount";

const DiscountSuggestionCard = ({ data, removeApproved }) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <>
            <ApproveDiscount open={open} handleOpen={handleOpen} data={data} removeApproved={removeApproved} />
            <Card color="transparent" className="flex flex-col min-w-[350px] bg-[#E0F8EA] py-0">
                <CardBody className="flex flex-col h-full justify-between p-5">

                    <Typography variant="h5" color="blue-gray" className="truncate">
                        Details
                    </Typography>

                    <Typography className="text-[16px]">
                        <li className="truncate">
                            <span className="font-bold">Item: </span> {data.item_name}
                        </li>
                        <li className="truncate">
                            <span className="font-bold">Suggested discount percentage: </span> {data.suggested_discount_percentage}
                        </li>
                        <li className="truncate">
                            <span className="font-bold">Discount valid until: </span> {moment(data.suggested_end_date).format('L')}
                        </li>
                        {
                            data.current_discounts_percentage === 0 ?
                                <li className="truncate ">

                                    <span className="font-bold italic">No active discounts on this item </span>

                                </li>
                                : <li className="truncate marker:text-red-500">
                                    <span className={`font-bold italic  text-red-500`}>Currently under {data.current_discounts_percentage * 100}% discount </span>

                                </li>

                        }
                    </Typography>
                    <Button
                        size="sm"
                        variant="text"
                        className="self-end flex items-center gap-2 w-fit text-[14px] px-5 mt-2"
                        onClick={handleOpen}
                    >
                        Approve
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </Button>
                </CardBody>

            </Card>
        </>

    )
}

export default DiscountSuggestionCard