import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Spinner,

} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useStoreData } from "../../../global/store";
import { sendRequest } from "../../../config/request";
import PrimaryButton from "../../ui/Button";
import { usePusher } from "../../../global/PusherContext";

import AddItems from "../../modals/addItems/AddItems";
import moment from "moment";
const TABLE_HEAD = ["Name", "Quantity Left", "Unit Stock Price", "Unit Price", "Production Date", "Expiry Date"];

const ItemsTable = () => {


    const [itemsData, setItemsData] = useState([])
    const { store } = useStoreData()
    const [open, setOpen] = useState(false);
    const [cashiersData, setCashiersData] = useState([])
    const [loading, setLoading] = useState(true)
    const handleOpen = () => setOpen(!open);

    const getItemsHandler = async () => {
        try {
            const response = await sendRequest({
                method: "GET",
                route: `/api/cashier/items/get_items/all`,
            });
            if (response.item) {
                setItemsData(response.item);
                setLoading(false)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getItemsHandler()
    }, [])

    const pusher = usePusher();
    const pusherEvent = () => {

        const channel = pusher.subscribe(`cashier-login-${store.inventory_id}`);
        channel.bind('cashier-logged-in', () => {
            getCashiers()
        })

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }

    useEffect(() => {
        if (store.inventory_id) pusherEvent()
    }, [store])

    const handleAddedCashier = (newData) => {
        setCashiersData((prevCashiersData) => [
            newData,
            ...prevCashiersData,

        ])

    }
    return (


        <Card className="flex flex-col h-[80%] w-[95%]">
            <AddItems open={open} handleOpen={handleOpen} handleNewCashier={handleAddedCashier} />

            <CardHeader floated={false} shadow={false} className="rounded-none ">
                <div className="mb-4 h-fit flex items-center justify-between gap-8">
                    <div className="flex flex-col">
                        <Typography variant="h5" color="blue-gray">
                            Items List
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all inventory items
                        </Typography>
                        <div className="flex gap-10">
                            <div className="flex gap-2 items-center">
                                <div className="min-w-[16px] min-h-[16px] max-w-[16px] max-h-[16px] border-[1px] mt-1 bg-green-200" />
                                <Typography color="gray" className="mt-1 font-normal text-[16px]">
                                    On Sale
                                </Typography>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="min-w-[16px] min-h-[16px] max-w-[16px] max-h-[16px] border-[1px] mt-1 bg-orange-200" />
                                <Typography color="gray" className="mt-1 font-normal text-[16px]">
                                    Expired
                                </Typography>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="min-w-[16px] min-h-[16px] max-w-[16px] max-h-[16px] border-[1px] mt-1 bg-red-200" />
                                <Typography color="gray" className="mt-1 font-normal text-[16px]">
                                    Sold out
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="flex shrink-0 flex-col sm:flex-row">
                        <PrimaryButton classNames="flex items-center bg-[--primary]" size="sm" label='Import Data' onClick={handleOpen} />
                    </div>
                </div>

            </CardHeader>
            {itemsData.length === 0 && !loading
                ?
                <div className="flex flex-1 h-full justify-center items-center">
                    <Typography color="gray" className="mt-1 font-normal text-center">
                        You have no Items in your inventory. <br className='block' /> Click the button above to add a or import new items.
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
                                {itemsData.map(
                                    ({ name, initial_quantity, available_quantity, price, production_date, expiry_date, discounts, original_price}, index) => {
                                        const isLast = index === cashiersData.length - 1;
                                        const classes = isLast
                                            ? "px-4"
                                            : "px-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={index} className={`border-l-[5px] ${(moment(expiry_date).isBefore() && available_quantity > 0) ? "border-orange-200" : available_quantity === 0 ? "border-red-200" : discounts.length > 0 ? "border-green-200" : "border-blue-gray-50/50"} ${index % 2 === 0 ? "" : " bg-blue-gray-50/50"}`}>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {name}
                                                    </Typography>
                                                </td>

                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {available_quantity}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        ${original_price.toFixed(2)}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        ${price.toFixed(2)}
                                                    </Typography>
                                                </td>

                                                <td className={classes}>

                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {production_date}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>

                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {expiry_date}
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

export default ItemsTable