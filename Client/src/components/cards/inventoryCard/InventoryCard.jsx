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

const InventoryCard = () => {
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
        <div className="w-full flex-1 flex flex-col items-center gap-10">
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
              <PrimaryButton label={"Add Item"} classNames={"w-[200px] bg-[--primary] "}/>
          </div>
        </div>
        

          


      </CardBody>

    </Card>
  );
}

export default InventoryCard