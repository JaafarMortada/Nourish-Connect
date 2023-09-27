import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Spinner,

} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { sendRequest } from '../../../config/request'
import { useStoreData } from "../../../global/store";
import { usePusher } from "../../../global/PusherContext";
import moment from "moment"

const TABLE_HEAD = ["ID", "barcode", "Time", "Number of items", "Total"];

const ReceiptsTable = () => {

    const { store, setStoreData } = useStoreData()

    const [receiptsData, setReceiptsData] = useState([])
    const [loading, setLoading] = useState(true)
    const getReceiptsHandler = async () => {
        try {
            const response = await sendRequest({
                method: "GET",
                route: "/api/cashier/items/get_receipts",

            });
            if (response.carts) {
                setReceiptsData(response.carts);
                setLoading(false)
            } 
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getReceiptsHandler()
    }, [])

    const pusher = usePusher();
    const pusherEvent = () => {

        const channel = pusher.subscribe(`inventory-${store.inventory_id}`);
        channel.bind('items-data-updated', () => {
            getReceiptsHandler()
        })

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }
    useEffect(() => {
        if (store.inventory_id) pusherEvent()
      }, [store])

    return (

        <Card className="flex flex-col h-[35%] w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none mb-2">
                <div className="h-fit flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Receipts
                        </Typography>
                    </div>
                </div>

            </CardHeader>
            {receiptsData.length === 0 && !loading
                ?
                <div className="flex flex-1 h-full justify-center items-center">
                    <Typography color="gray" className="mt-1 font-normal text-center">
                        No sales yet.
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
                                {receiptsData.map(
                                    ({ id, created_at, barcode, total_items, total_price }, index) => {
                                        const isLast = index === receiptsData.length - 1;
                                        const classes = isLast
                                            ? "px-4"
                                            : "px-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={id} className={`${index % 2 === 0 ? "" : "bg-blue-gray-50/50"}`}>
                                                <td className={classes}>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex flex-col">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {id}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {moment(created_at).format('LLLL')}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {barcode}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {total_items}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {total_price}
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
    );
}

export default ReceiptsTable