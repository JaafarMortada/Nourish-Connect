import {
    Card,
    Typography,
    CardBody,
    CardHeader,
    Spinner,
    Tabs,
    Tab,
    TabsHeader,

} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { sendRequest } from "../../../config/request";
import { usePusher } from "../../../global/PusherContext";
import { useStoreData } from "../../../global/store";
import PieChart from "../../charts/PieChart";

const TABLE_HEAD = ["Item", "Quantity Sold", "Total Value"];

const TopItems = () => {

    const { store } = useStoreData()
    const [loading, setLoading] = useState(true)
    const [topFiveItemsData, setTopFiveItemsData] = useState([])
    const [topFiveBy, setTopFiveBy] = useState('quantity_sold')
    const handleTabChange = () => {
        if (topFiveBy === 'quantity_sold') setTopFiveBy('sold_value')
        if (topFiveBy === 'sold_value') setTopFiveBy('quantity_sold')
    }

    const getTopFiveItems = async () => {
        try {
            const response = await sendRequest({
                method: "GET",
                route: `/api/manager/get_top_five_items/${topFiveBy ? topFiveBy : "quantity_sold"}`,
            });
            if (response.message === "success") {
                setTopFiveItemsData(response.top_five_items);
                setLoading(false)
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getTopFiveItems()
    }, [topFiveBy])

    const pusher = usePusher();
    const pusherEvent = () => {

        const channel = pusher.subscribe(`inventory-${store.inventory_id}`);
        channel.bind('items-data-updated', () => {
            getTopFiveItems()
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
        <Card
            className={`md:max-h-[455px] h-full  md:w-[69%] flex justify-between gap-x-5 w-[500px] ${loading ? "justify-center items-center" : ""}`}
        >
            <CardHeader floated={false} shadow={false} className="rounded-none flex justify-between items-center min-w-[95%]">

                <Typography variant="h5" color="blue-gray">
                    Top Items This Month
                </Typography>
                <div className="flex items-center gap-5">
                    {/* <span>Sort by: </span> */}
                    <Tabs value={'quantity_sold'} className="w-min md:w-max">
                        <TabsHeader>
                            <Tab value={'quantity_sold'} onClick={handleTabChange} className="w-[150px]">
                                Quantity Sold
                            </Tab>
                            <Tab value={'sold_value'} onClick={handleTabChange} className="w-[150px]">
                                Total Value
                            </Tab>
                        </TabsHeader>
                    </Tabs>
                </div>

            </CardHeader>

            <CardBody className="[&>div]:flex [&>div]:items-center [&>div]:justify-center max-h-full overflow-scroll px-5 flex-1 md:flex-row flex-col-reverse gap-5 flex justify-between items-center">
                {loading ? <Spinner className="w-20 h-20 pt-3" /> :
                    topFiveItemsData.length === 0 ? <span className="w-full text-center">No data found</span> :
                        <>
                            <div className="md:min-w-[45%] min-w-[90%] z-10">
                                <table className="w-full text-left ml-3">
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD.map((head) => (
                                                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
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
                                        {topFiveItemsData.map(({ item_name, quantity_sold, sold_value }, index) => (
                                            <tr key={item_name} className="even:bg-blue-gray-50">
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal max-w-[120px] truncate">
                                                        {item_name}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {quantity_sold}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {sold_value} $
                                                    </Typography>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <PieChart data={topFiveItemsData} sortBy={topFiveBy} />
                        </>
                }
            </CardBody>

        </Card>
    )
}

export default TopItems