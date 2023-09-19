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
import PieChart from "../../charts/PieChart";

const TABLE_HEAD = ["Item", "Quantity Sold", "Total Value"];

const TopItems = () => {
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
            console.log(error);

        }
    }

    useEffect(() => {
        getTopFiveItems()
    }, [topFiveBy])

    return (
        <Card
            className={` md:h-full max-h-fit md:w-[58%] w-[500px] ${loading ? "justify-center items-center" : ""}`}
        >
            <CardHeader floated={false} shadow={false} className="rounded-none flex justify-between items-center min-w-max">

                <Typography variant="h5" color="blue-gray">
                    Top Items
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

            <CardBody className="overflow-scroll px-5 flex-1 md:flex-row flex-col-reverse md:gap-0 gap-5 flex items-center">
                {loading ? <Spinner className="w-20 h-20 pt-3" /> :
                    <>
                        <div className="md:min-w-[45%] min-w-[90%]">
                            <table className="w-full min-w-max table-auto text-left">
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
                                        <tr key={item_name} className="even:bg-blue-gray-50/50">
                                            <td className="p-4">
                                                <Typography variant="small" color="blue-gray" className="font-normal">
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