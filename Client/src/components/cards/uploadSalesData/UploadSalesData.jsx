import {
    Card,
    CardHeader,
    Typography,
    CardBody,
} from "@material-tailwind/react";
import { POSuploadConditions } from "../../../constants";
import FileDragInput from "../../ui/FileDragInput";
import { useState } from "react";

const UploadSalesData = () => {
    const [data, setData] = useState({
        inventoryFile: "",
    
      })
      const handleFileUpload = (file) => {
        setData({ ...data, inventoryFile: file })
      };
    
      const handleDataChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
      }
    return (

        <Card className="flex flex-col h-[80%] w-[95%]">
            <CardHeader floated={false} shadow={false} className="rounded-none ">
                <div className="mb-4 h-fit flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray" className="left-0">
                            Or Simply upload an Excel or CSV File
                        </Typography>
                    </div>
                </div>

            </CardHeader>
            <CardBody className="overflow-scroll px-0 flex-1 flex justify-center">
                <div className="flex lg:flex-row flex-col-reverse w-[90%] items-center justify-between border-2 border-[--primary] rounded-lg p-10">
                    <div>
                        {POSuploadConditions.map((condition) => (
                            condition.id === 'POSConditionsTitle'
                                ?
                                <Typography key={condition.id} variant="h6" color="blue-gray" className="left-0">
                                    {condition.text}
                                </Typography>
                                :
                                <li key={condition.id}>{condition.text}</li>
                        ))}
                    </div>
                    <FileDragInput name={"inventoryData"} value={data.inventoryFile} onFileUpload={handleFileUpload} />

                </div>
            </CardBody>

        </Card>
    );
}

export default UploadSalesData