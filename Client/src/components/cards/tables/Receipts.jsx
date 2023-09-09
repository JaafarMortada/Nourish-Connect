import {
    Card,
    CardHeader,
    Typography,
    CardBody,
} from "@material-tailwind/react";

const TABLE_HEAD = ["ID", "Customer's name", "Number of items", "Time", "Total"];

const TABLE_ROWS = [
    {
        id: "3",
        customerName: "Stephen Tries",
        numberOfItems: "Number of Items",
        time: "15:45",
        total: "45",
    },

];


const ReceiptsTable = () => {
    return (

        <Card className="flex flex-col h-[40%] w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none mb-2">
                <div className="h-fit flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Receipts
                        </Typography>
                    </div>
                </div>

            </CardHeader>
            {TABLE_ROWS.length === 0
                ?
                <div className="flex flex-1 h-full justify-center items-center">
                    <Typography color="gray" className="mt-1 font-normal text-center">
                        No sales yet.
                    </Typography>
                </div>
                :
                <CardBody className="overflow-scroll px-0 flex-1">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
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
                            {TABLE_ROWS.map(
                                ({ id, customerName, numberOfItems, time, total }, index) => {
                                    const isLast = index === TABLE_ROWS.length - 1;
                                    const classes = isLast
                                        ? "px-4"
                                        : "px-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={id} className={`${index % 2 === 0 ? "" : "bg-blue-gray-50/50"}`}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {id}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {customerName}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {numberOfItems}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {time}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {total}
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody>}

        </Card>
    );
}

export default ReceiptsTable