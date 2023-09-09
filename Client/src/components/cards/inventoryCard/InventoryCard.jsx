import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Textarea,
} from "@material-tailwind/react";

import PrimaryButton from "../../ui/Button";
import InputField from "../../ui/Input";
import TextAreaField from "../../ui/TextAreaField";
import FileDragInput from "../../ui/FileDragInput";
import { useState } from "react";
import { inventoryUploadConditions } from "../../../constants";

const InventoryCard = () => {



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
            <Typography variant="h5" color="blue-gray">
              Add Stock
            </Typography>
          </div>
        </div>

      </CardHeader>

      <CardBody className="flex flex-wrap overflow-scroll px-0  justify-center lg:flex-row flex-col">
        <div className="w-[full] flex-1 flex flex-col items-center gap-10">
          <div className="flex gap-10 lg:flex-row flex-col">
            <div className="w-[200px]">
              <InputField label={"Item's name"} />
            </div>
            <div className="w-[200px]">
              <InputField label={"Stock Price"} />
            </div>
            <div className="w-[200px]">
              <InputField label={"Retail Price"} />
            </div>
            <div className="w-[200px]">
              <InputField label={"Category"} />
            </div>
          </div>
          <div className="flex gap-10 lg:flex-row flex-col">
            <div className="w-[200px]">
              <InputField label={"Barcode"} />
            </div>
            <div className="w-[200px]">
              <InputField label={"Quantity"} />
            </div>
            <div className="w-[200px]">
              <InputField label={"Production Date"} type={"date"} />
            </div>
            <div className="w-[200px]">
              <InputField label={"Expiry Date"} type={"date"} />
            </div>
          </div>
          <div className="lg:w-[920px] w-[200px] flex justify-center items-center">
            <TextAreaField label={"Description"} />
          </div>
          <div className="flex lg:justify-end justify-center lg:w-[920px] w-[200px] max-h-[40px]">
            <PrimaryButton label={"Add Item"} classNames={"w-[200px] bg-[--primary] "} />
          </div>
          <div className="w-full pl-4">
            <Typography variant="h5" color="blue-gray" className="left-0">
              Or Simply upload an Excel or CSV File
            </Typography>
          </div>

          <div className="flex lg:flex-row flex-col-reverse w-[70%] items-center justify-between border-2 border-[--primary] rounded-lg p-10">
            <div>
              {inventoryUploadConditions.map((condition) => (
                condition.id === 'inventoryConditionsTitle'
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
        </div>






      </CardBody>

    </Card>
  );
}

export default InventoryCard