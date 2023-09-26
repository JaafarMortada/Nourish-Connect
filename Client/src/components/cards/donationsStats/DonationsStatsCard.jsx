import {
    Card,
    Typography,
    CardBody,
    CardHeader,
    Spinner,

} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import StatCard from "../miniCards/StatCard";
import { sendRequest } from "../../../config/request";

const DonationsStatsCard = () => {
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState([])

    const getDonationsStats = async () => {

        try {
            const response = await sendRequest({
                method: "GET",
                route: `/api/manager/get_donations_stats`,
            });
            if (response.message === 'success') {
                setStats(Object.entries(response.stats))
                setLoading(false)
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDonationsStats()
    }, [])

    return (
        <Card
            className={` md:h-full h-fit md:w-full w-[500px] `}
        >
            <CardHeader floated={false} shadow={false} className="rounded-none ">

                <Typography variant="h5" color="blue-gray">
                    Achievements
                </Typography>

            </CardHeader>
            {loading ? 
            <div className="w-full h-full flex items-center justify-center">
                <Spinner className="w-20 h-20 pt-3" />
            </div> 
            : <CardBody className="overflow-hidden px-5 flex-1 flex md:flex-row flex-col justify-around items-center md:gap-0 gap-10 ">
                    {
                        stats.map(([key, value]) => (
                            <StatCard
                                key={key}
                                data={value}
                            />
                        ))
                    }
                </CardBody>
            }
        </Card>
    )
}

export default DonationsStatsCard