import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Tooltip,
    Spinner,

} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useStoreData } from "../../../global/store";
import { sendRequest } from "../../../config/request";
import { usePusher } from "../../../global/PusherContext";
import moment from "moment"

const TABLE_HEAD = ["Title", "Description", "Started At", "Time Left"];

const DiscountsTable = () => {

    const { store } = useStoreData()

    const [discountsData, setDiscountsData] = useState([])
    const [loading, setLoading] = useState(true);

    const getDiscountsData = async () => {
        try {
            const response = await sendRequest({
                method: "GET",
                route: "/api/manager/get_discounts_data",
            });
            if (response.message === "success") {
                setDiscountsData(response.discounts);
                setLoading(false)
            } 
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDiscountsData()
    }, [])

    const pusher = usePusher();
    const pusherEvent = () => {

        const channel = pusher.subscribe(`user-discount-${store.inventory_id}`);
        channel.bind('discounts-data-updated', () => {
            getDiscountsData()
        })

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }

    useEffect(() => {
        pusherEvent()
    }, [store])

    return (
        <>

            <Card className="flex flex-col h-[40%] w-[95%]">
                <CardHeader floated={false} shadow={false} className="rounded-none ">
                    <div className="mb-4 h-fit flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Discounts Overview
                            </Typography>
                        </div>
                    </div>

                </CardHeader>
                {discountsData.length === 0 && !loading
                    ?
                    <div className="flex flex-1 h-full justify-center items-center">
                        <Typography color="gray" className="mt-1 font-normal text-center">
                            You have not done any discount yet. <br className='block' /> Browse the suggestions or create a custom discount.
                        </Typography>
                    </div>
                    :
                    <CardBody className={`overflow-scroll px-0 flex-1 ${loading ? "flex w-full h-full items-center justify-center" : ""} `}>
                        {loading ? <Spinner className="w-20 h-20" />
                            :
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
                                    {discountsData.map(

                                        ({ title, description, started_at, time_left }, index) => {
                                            const isLast = index === discountsData.length - 1;
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
                                                        <Tooltip className="bg-[--primary] max-w-[40vw] p-3" content={description}>
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal max-w-[200px] truncate"
                                                            >
                                                                {description}
                                                            </Typography>
                                                        </Tooltip>

                                                    </td>

                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {moment(started_at).format('LLLL')}

                                                        </Typography>
                                                    </td>

                                                    <td className={`${classes}`}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {time_left}

                                                        </Typography>
                                                    </td>

                                                </tr>
                                            );
                                        },
                                    )}
                                </tbody>
                            </table>}
                    </CardBody>}

            </Card>

        </>
    );
}

export default DiscountsTable