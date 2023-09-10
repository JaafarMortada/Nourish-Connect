import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import ItemCard from "../miniCards/ItemCard";
import { sendRequest } from "../../../config/request";
import { useEffect, useState } from "react";
import { useStoreData } from "../../../global/store";
const ItemsList = ( {setCheckoutItems} ) => {

  const { store, setStoreData } = useStoreData()

  const [itemsData, setItemsData] = useState([])

  useEffect(() => {
    const getItemsHandler = async () => {
      try {
        const response = await sendRequest({
          method: "GET",
          route: "/api/cashier/items/get_items",
          token: store.token,
        });
        if (response.item) {
          setItemsData(response.item);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getItemsHandler()
  }, [])

  return (
    <Card className="h-[60%] w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none pb-[10px]">
        <div className="mb-8 flex items-center justify-between gap-8  translate-y-[5px]">
          <div>
            <Typography variant="h5" color="blue-gray">
              Items
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row w-[35%]">
            <Input
              className="translate-y-[5px] "
              labelProps={{
                className: "translate-y-[5px] "
              }}

              label="Search Items"
              icon={<MagnifyingGlassIcon className="h-5 w-5 translate-y-[5px]" />}
            />
          </div>
        </div>

      </CardHeader>
      <CardBody className="overflow-scroll flex flex-wrap gap-x-10 gap-y-5 justify-around">
        {
          itemsData.map((item) => (
            <ItemCard key={item.id} data={item} 
            setCheckoutItems={setCheckoutItems}
            />
          ))
        }
      </CardBody>

    </Card>
  );
}

export default ItemsList