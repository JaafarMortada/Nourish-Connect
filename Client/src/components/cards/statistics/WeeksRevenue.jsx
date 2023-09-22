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
            className={`flex-1  md:min-w-[40%] md:max-w-[40%] min-w-[500px] max-w-[500px] `}
        >
            <CardHeader floated={false} shadow={false} className=" rounded-none ">
                <Typography variant="h5" color="blue-gray">
                    Weekly Revenue
                </Typography>
            </CardHeader>

            
                <CardBody className="h-[400px] p-0 flex items-center justify-center">
                {loading ? 
                <Spinner className="w-20 h-20 pt-3" />
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