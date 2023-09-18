import {
    Card,
    CardHeader,
    CardBody,
    Spinner,
    Typography
} from "@material-tailwind/react"
import { useState, useEffect } from "react"
import { sendRequest } from "../../../config/request"
import BarChart from "../../charts/BarChart"

const WeeksRevenue = () => {

    const [loading, setLoading] = useState(true)
    const [WeeklyRevenueData, setWeeklyRevenueData] = useState([])
    useEffect(() => {
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
                console.log(error);

            }
        }
        getWeeklyRevenueData()
    }, [])
    return (
        <Card
            className={`flex flex-1 flex-col min-h-[400px] max-h-[401px] md:min-w-[40%] md:max-w-[40%] min-w-[500px] max-w-[501px] ${loading ? "justify-center items-center" : ""}`}
        >
            <CardHeader floated={false} shadow={false} className=" rounded-none ">
                <Typography variant="h6" color="blue-gray">
                    Weekly Revenue
                </Typography>
            </CardHeader>

            {loading ? <Spinner className="w-20 h-20" /> :
                <CardBody className="flex-1 p-0 box-content">
                    <BarChart 
                        data={WeeklyRevenueData} 
                        keys={"revenue"} 
                        LegendLabel={"Total Sales (in $)"}
                    />
                </CardBody>}
        </Card>
    )
}

export default WeeksRevenue