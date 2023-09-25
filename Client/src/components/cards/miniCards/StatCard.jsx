import {
    Card,
    CardBody,
    Typography,

} from "@material-tailwind/react";

import { intToString } from "../../../utilities";
const StatCard = ({ data }) => {
    return (
        <Card className="flex flex-col md:w-[23%] w-[90%] h-full min-h-[150px] rounded-none border-[--primary] border-b-4 transition-all py-0  bg-blue-gray-50/50 shadow-md">
            <CardBody className="flex flex-col flex-1 justify-around p-0 items-center">

                <Typography variant="h5" color="blue-gray" >
                    {data[0]}
                </Typography>
                <Typography variant="h2" className="text-[--primary]">
                    {intToString(data[1])} {data[2] === "worth of items" ? " $" : ""}
                </Typography>
                <Typography variant="h5" color="blue-gray">
                    {data[2]}
                </Typography>

            </CardBody>

        </Card>
    )
}

export default StatCard