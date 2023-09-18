import {
    Card,
    Typography,
    CardBody,
    CardHeader,
    Spinner,

} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import StatCard from "../miniCards/StatCard";

const DonationsStatsCard = () => {
    const [loading, setLoading] = useState(false)
    return (
        <Card
            className={` md:h-full h-fit md:w-full w-[500px] ${loading ? "justify-center items-center" : ""}`}
        >
            <CardHeader floated={false} shadow={false} className="rounded-none ">

                <Typography variant="h5" color="blue-gray">
                    Achievements
                </Typography>

            </CardHeader>
            {loading ? <Spinner className="w-20 h-20 pt-3"  /> :
                <CardBody className="overflow-hidden px-5 flex-1 flex md:flex-row flex-col justify-around items-center md:gap-0 gap-10 ">
                    <StatCard />
                    <StatCard />
                    <StatCard />
                    <StatCard />
                </CardBody>
            }
        </Card>
    )
}

export default DonationsStatsCard