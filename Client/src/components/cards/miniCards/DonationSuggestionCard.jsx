import {
    Card,
    CardBody,
    Typography,
    Button,

} from "@material-tailwind/react";
import ApproveDonation from "../../modals/approveDonation/ApproveDonationModal";
import { useState } from "react";
const DonationSuggestionCard = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <>
            <ApproveDonation open={open} handleOpen={handleOpen}/>
            <Card color="transparent" className="flex flex-col min-w-[350px] bg-[#E0F8EA] py-0">
                <CardBody className="flex flex-col h-full justify-between p-5">

                    <Typography variant="h5" color="blue-gray" className="truncate">
                        Details
                    </Typography>

                    <Typography className="text-[16px]">
                        <li className="truncate">
                            <span className="font-bold">Charity: </span> food blessed.
                        </li>
                        <li className="truncate">
                            <span className="font-bold">Item: </span> Apples.
                        </li>
                        <li className="truncate">
                            <span className="font-bold">Requested Quantity: </span> 21.
                        </li>
                        <li className="truncate">
                            <span className="font-bold">Quantity to donate: </span> 21.
                        </li>
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

export default DonationSuggestionCard