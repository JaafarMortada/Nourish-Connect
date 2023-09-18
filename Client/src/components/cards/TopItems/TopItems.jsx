import {
    Card,
    Typography,
    CardBody,
    CardHeader,
    Spinner,

} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import PieChart from "../../charts/PieChart";

const TABLE_HEAD = ["Item", "Quantity Sold", "Revenue"];

const TABLE_ROWS = [
    {
        name: "Apples",
        job: "250",
        date: "120$",
    },
    {
        name: "Banana",
        job: "200",
        date: "100$",
    },
    {
        name: "Rice",
        job: "100",
        date: "90$",
    },
    {
        name: "Juice",
        job: "90",
        date: "80$",
    },
    {
        name: "Canned Corn",
        job: "90",
        date: "75$",
    },

];

const TopItems = () => {
    const [loading, setLoading] = useState(false)
    return (
        <Card
            className={` md:h-full max-h-fit md:w-[58%] w-[500px] ${loading ? "justify-center items-center" : ""}`}
        >
            <CardHeader floated={false} shadow={false} className="rounded-none ">

                <Typography variant="h5" color="blue-gray">
                    Top Items
                </Typography>

            </CardHeader>
            {loading ? <Spinner className="w-20 h-20 pt-3" /> :
                <CardBody className="overflow-scroll px-5 flex-1 md:flex-row flex-col-reverse md:gap-0 gap-5 flex items-center">
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
                                {TABLE_ROWS.map(({ name, job, date }, index) => (
                                    <tr key={name} className="even:bg-blue-gray-50/50">
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {name}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {job}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {date}
                                            </Typography>
                                        </td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <PieChart />
                </CardBody>
            }
        </Card>
    )
}

export default TopItems