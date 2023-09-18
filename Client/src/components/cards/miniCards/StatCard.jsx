import {
    Card,
    CardBody,
    Typography,

} from "@material-tailwind/react";

import { intToString } from "../../../utilities";
const StatCard = () => {
  return (
    <Card color="transparent" className="flex flex-col md:w-[23%] w-[90%] min-h-[200px]  max-h-[150px] rounded-none border-[--primary] border-b-4 transition-all py-0  drop-shadow-xl">
                <CardBody className="flex flex-col flex-1 justify-around p-0 items-center">

                    <Typography variant="h5" color="blue-gray" >
                        Donated
                    </Typography>
                    <Typography variant="h2" className="text-[--primary]">
                        {intToString(3600)}
                    </Typography>
                    <Typography variant="h5" color="blue-gray">
                        Worth of items
                    </Typography>
                    
                </CardBody>

            </Card>
  )
}

export default StatCard