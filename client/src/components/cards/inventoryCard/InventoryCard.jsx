import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Spinner,
} from "@material-tailwind/react";

import PrimaryButton from "../../ui/Button";
import InputField from "../../ui/Input";
import TextAreaField from "../../ui/TextAreaField";
import FileDragInput from "../../ui/FileDragInput";
import { useState } from "react";
import { inventoryUploadConditions } from "../../../constants";
import { sendRequest } from "../../../config/request";
import { websocketRequest } from "../../../config/websocketRequest";
import { useStoreData } from "../../../global/store";
import DownloadTemplate from "../../ui/DownloadTemplate";

const InventoryCard = () => {

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    original_price: "",
    quantity: "",
    production_date: "",
    expiry_date: "",
    category: "",
    barcode: "",
    inventoryFile: "",

  })

  const { store } = useStoreData()

  const [error, setError] = useState(false)
  const [fileError, setFileError] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = (file) => {
    setData({ ...data, inventoryFile: file })
  };
  const handleImageUpload = (file) => {
    setData({ ...data, image: file })
  };

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleError = () => {
    setError(true)
    setTimeout(() => {
      setError(false);
    }, 3000)
  }

  const handleFileError = () => {
    setUploading(false)
    setFileError(true)
    setTimeout(() => {
      setFileError(false);
    }, 3000)
  }

  const handleAddItem = async () => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', data.price);
      formData.append('original_price', data.original_price);
      formData.append('quantity', data.quantity);
      formData.append('production_date', data.production_date);
      formData.append('expiry_date', data.expiry_date);
      if (data.image) formData.append('image', data.image);
      formData.append('category', data.category);
      formData.append('barcode', data.barcode);
      const response = await sendRequest({
        method: "POST",
        route: "/api/cashier/items/add_item",
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,

      });

      if (response.message === "Item added successfully") {
        setData({
          name: "",
          description: "",
          price: "",
          original_price: "",
          quantity: "",
          production_date: "",
          expiry_date: "",
          category: "",
          barcode: "",
          inventoryFile: "",
        })
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

  const handleUpload = async () => {
    setUploading(true)
    try {
      const formData = new FormData();
      formData.append('file', data.inventoryFile);

      const response = await sendRequest({
        method: "POST",
        route: "/api/cashier/items/import_file/items",
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,

      });
      if (response.message === "data imported successfully") {
        setData({
          ...data,
          inventoryFile: "",
        })
        setUploading(false)
        websocketRequest({
          inventoryId: store.inventory_id,
          WSevent: "items"
        })
      } else {
        handleFileError()
      }
    } catch (error) {
      handleFileError()
    }
  }

  return (

    <Card className="flex flex-col h-[88%] w-[95%]">
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
        <div className="w-[full] flex-1 flex flex-col items-center gap-10 overflow-scroll">
          <div className="flex gap-10 lg:flex-row flex-col pt-5">
            <div className="w-[200px]">
              <InputField
                label={"Item's name"}
                name={"name"}
                value={data.name}
                onChange={handleDataChange}
              />
            </div>
            <div className="w-[200px]">
              <InputField
                label={"Stock Price"}
                name={"original_price"}
                value={data.original_price}
                onChange={handleDataChange}
              />
            </div>
            <div className="w-[200px]">
              <InputField
                label={"Retail Price"}
                name={"price"}
                value={data.price}
                onChange={handleDataChange}
              />
            </div>
            <div className="w-[200px]">
              <InputField
                label={"Category"}
                name={"category"}
                value={data.category}
                onChange={handleDataChange}
              />
            </div>
          </div>
          <div className="flex gap-10 lg:flex-row flex-col">
            <div className="w-[200px]">
              <InputField
                label={"Barcode"}
                name={"barcode"}
                value={data.barcode}
                onChange={handleDataChange}
              />
            </div>
            <div className="w-[200px]">
              <InputField
                label={"Quantity"}
                name={"quantity"}
                value={data.quantity}
                onChange={handleDataChange}
              />
            </div>
            <div className="w-[200px]">
              <InputField
                label={"Production Date"}
                type={"date"}
                name={"production_date"}
                value={data.production_date}
                onChange={handleDataChange}
              />
            </div>
            <div className="w-[200px]">
              <InputField
                label={"Expiry Date"}
                type={"date"}
                name={"expiry_date"}
                value={data.expiry_date}
                onChange={handleDataChange}
              />
            </div>
          </div>
          <div className="lg:w-[920px] w-[200px] flex  lg:flex-row flex-col justify-center items-center gap-20">
            <TextAreaField
              label={"Description"}
              name={"description"}
              value={data.description}
              onChange={handleDataChange}
            />
            <FileDragInput
              onFileUpload={handleImageUpload}
              label={"Add the item's image."}
              classNames={"!w-[200px] !px-2 !h-[100px] !font-[16px]"}
              showIcon={false}
              name={"image"}
              value={data.image}
              accepted_types={['image/jpeg', 'image/png', 'image/jpg',]}
              error_message={"Please Upload an image file only."}
            />

          </div>
          <div className="flex lg:justify-end justify-center lg:w-[920px] w-[200px] max-h-[40px]">
            <PrimaryButton
              label={`${error ? "An error occurred" : "Add Item"}`}
              classNames={`w-[200px] ${error ? "bg-red-500" : "bg-[--primary]"}`}
              onClick={handleAddItem}
            />
          </div>
          <div className="w-full pl-4">
            <Typography variant="h5" color="blue-gray" className="left-0">
              Or Simply upload an Excel or CSV File
            </Typography>
          </div>

          <div className="flex lg:w-[920px] w-[200px] lg:flex-row flex-col-reverse items-center lg:justify-between ">
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
            <FileDragInput
              name={"inventoryData"}
              value={data.inventoryFile}
              onFileUpload={handleFileUpload}
            />

          </div>
          <div className="flex justify-between lg:w-[920px] w-[200px]">
            <DownloadTemplate path={"excel_templates"} fileName={"inventory_template.xlsx"} />
            <PrimaryButton
              label={uploading ? <Spinner className="w-4" /> : `${fileError ? "An error occurred" : "Upload file"}`}
              classNames={`max-h-[40px]  flex justify-center items-center w-[200px] ${fileError ? "bg-red-500" : "bg-[--primary]"}`}
              onClick={handleUpload}
            />
          </div>
        </div>

      </CardBody>

    </Card>
  );
}

export default InventoryCard