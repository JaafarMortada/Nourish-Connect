import {
    Card,
    CardHeader,
    CardBody,
    Spinner,
    Typography
} from "@material-tailwind/react"
import { useState, useEffect } from "react"
import { sendRequest } from "../../../config/request"
import { usePusher } from "../../../global/PusherContext"
import { useStoreData } from "../../../global/store"
import BarChart from "../../charts/BarChart"

const WeeksRevenue = () => {

    const { store } = useStoreData()
    const [loading, setLoading] = useState(true)
    const [WeeklyRevenueData, setWeeklyRevenueData] = useState([])

    const getWeeklyRevenueData = async () => {
        try {
            const response = await sendRequest({
                method: "GET",
                route: "/api/manager/get_week_days_revenue",
            });
            if (response.message === "success") {
                setWeeklyRevenueData(response.weekData);
                setLoading(false)
            }
        } catch (error) {
            

        }
    }

    useEffect(() => {
        getWeeklyRevenueData()
    }, [])

    const pusher = usePusher();
    const pusherEvent = () => {

        const channel = pusher.subscribe(`inventory-${store.inventory_id}`);
        channel.bind('items-data-updated', () => {
            getWeeklyRevenueData()
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
            className={`flex-1  md:min-w-[30%] md:max-w-[30%] min-w-[500px] max-w-[500px] `}
        >
            <CardHeader floated={false} shadow={false} className=" rounded-none ">
                <Typography variant="h5" color="blue-gray">
                    Weekly Revenue
                </Typography>
            </CardHeader>


            <CardBody className="h-[400px] [&>div]:max-h-[350px] p-0 flex items-center justify-center">
                {loading ?
                    <Spinner className="w-20 h-20" />
                    :
                    <BarChart
                        data={WeeklyRevenueData}
                        keys={"revenue"}
                        LegendLabel={"Total Sales (in $)"}
                    />}
            </CardBody>
        </Card>
    )
}

export default WeeksRevenue