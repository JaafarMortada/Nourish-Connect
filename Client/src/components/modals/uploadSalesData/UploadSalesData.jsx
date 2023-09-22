import {
    Dialog,
    DialogHeader,
    Typography,
    DialogBody,
    DialogFooter,
    Button,
    Spinner,

} from "@material-tailwind/react";
import { POSuploadConditions } from "../../../constants";
import PrimaryButton from "../../ui/Button";
import FileDragInput from "../../ui/FileDragInput";
import { useState } from "react";
import { sendRequest } from "../../../config/request";
import { websocketRequest } from "../../../config/websocketRequest";

const UploadSalesData = ({ open, handleOpen }) => {
    const [data, setData] = useState({
        inventoryFile: "",

    })

    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState(false)

    const handleFileUpload = (file) => {
        setData({ ...data, inventoryFile: file })
    };

    const handleDataChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleError = () => {
        setUploading(false)
        setError(true)
        setTimeout(() => {
          setError(false);
        }, 3000)
      }

    const handleUpload = async () => {
        setUploading(true)
        try {
            const formData = new FormData();
            formData.append('file', data.inventoryFile);

            const response = await sendRequest({
                method: "POST",
                route: "/api/cashier/items/import_file/sales",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,

            });
            if (response.message === "data imported successfully") {
                setData({
                    inventoryFile: "",
                })
                setUploading(false)
                websocketRequest({
                    inventoryId: store.inventory_id,
                    WSevent: "items"
                })
            } else {
                handleError()
            }
        } catch (error) {
            handleError()
        }
    }

    return (

        <Dialog
            className="flex flex-col overflow-scroll"
            size="xl"
            open={open}
            handler={handleOpen}
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
            }}
        // className="overflow-scroll"
        >
            <DialogHeader floated={false} shadow={false} className="rounded-none ">
                <div className="mb-4 h-fit flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray" className="left-0">
                            Upload an Excel or CSV File of Your Sales Data
                        </Typography>
                    </div>
                </div>

            </DialogHeader>
            <DialogBody className="overflow-scroll px-0 flex-1 flex justify-center">
                <div className="flex lg:flex-row flex-col-reverse w-full items-center justify-between  p-10">
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
            </DialogBody>
            <DialogFooter className="flex justify-between px-10">
                <Button
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1"
                >
                    <span>Close</span>
                </Button>
                <PrimaryButton classNames={"bg-[--primary] max-h-[40px] min-w-[104px] flex justify-center items-center"} onClick={handleUpload} label={uploading ? <Spinner className="w-4" /> : "Confirm"} />
            </DialogFooter>
        </Dialog>
    );
}

export default UploadSalesData