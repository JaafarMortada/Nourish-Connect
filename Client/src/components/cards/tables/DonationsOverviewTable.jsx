import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Chip,

} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useStoreData } from "../../../global/store";
import { sendRequest } from "../../../config/request";


const TABLE_HEAD = ["Title", "Category", "Quantity", "Donated By", "Status"];

const DonationsOverviewTable = () => {

    const { store } = useStoreData()

    const [donationsData, setDonationsData] = useState([])

    return (
        <>

            <Card className="flex flex-col h-fit min-h-[599px] max-h-[600px] w-[95%]">
                <CardHeader floated={false} shadow={false} className="rounded-none ">
                    <div className="mb-4 h-fit flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Donations Overview
                            </Typography>
                        </div>
                    </div>

                </CardHeader>
                {donationsData.length === 0
                    ?
                    <div className="flex flex-1 h-full justify-center items-center">
                        <Typography color="gray" className="mt-1 font-normal text-center">
                            You have no donations.<br />You can send a request using the above form.
                        </Typography>
                    </div>
                    :
                    <CardBody className="overflow-scroll px-0 flex-1">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {donationsData.map(
                                    ({ title, category, quantity, donated_by, status }, index) => {
                                        const isLast = index === donationsData.length - 1;
                                        const classes = isLast
                                            ? "px-4 py-2"
                                            : "px-4 border-b border-blue-gray-50 py-2";

                                        return (
                                            <tr key={index} className={`${index % 2 === 0 ? "" : "bg-blue-gray-50/50"}`}>
                                                <td className={classes}>
                                                    <div className="flex items-center gap-3">

                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {title}
                                                        </Typography>
                                                    </div>
                                                </td>

                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {category}
                                                    </Typography>
                                                </td>

                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {quantity}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>

                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {donated_by}
                                                    </Typography>
                                                </td>
                                                <td className={`${classes}`}>
                                                        <Chip
                                                            variant="ghost"
                                                            size="sm"
                                                            value={status ? "Received" : "Pending"}
                                                            color={status ? "green" : "blue-gray"}
                                                            className="w-[100px] flex justify-center"
                                                        />
                                                </td>

                                            </tr>
                                        );
                                    },
                                )}
                            </tbody>
                        </table>
                    </CardBody>}

            </Card>

        </>
    );
}

export default DonationsOverviewTable