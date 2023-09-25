import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Spinner,

} from "@material-tailwind/react";
import ItemCard from "../miniCards/ItemCard";
import { sendRequest } from "../../../config/request";
import { useEffect, useState } from "react";
import { useStoreData } from "../../../global/store";
import { usePusher } from "../../../global/PusherContext";

const ItemsList = ({ setCheckoutItems }) => {

  const { store, setStoreData } = useStoreData()

  const [itemsData, setItemsData] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true)
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, [delay]);

      return () => {
        clearTimeout(timer);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const getItemsHandler = async () => {
    try {
      const response = await sendRequest({
        method: "GET",
        route: `/api/cashier/items/get_items/${debouncedSearchTerm}`,
        token: store.token,
      });
      if (response.item) {
        setItemsData(response.item);
        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch (error) {
      
      setLoading(false)
    }
  }

  useEffect(() => {
    getItemsHandler()
  }, [debouncedSearchTerm])

  const pusher = usePusher();
  const pusherEvent = () => {

    const channel = pusher.subscribe(`inventory-${store.inventory_id}`);
    channel.bind('items-data-updated', () => {
      getItemsHandler()
    })

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }

  useEffect(() => {
    if (store.inventory_id) pusherEvent()
  }, [store])

  return (
    <Card className="h-[60%] w-full flex flex-col">
      <CardHeader floated={false} shadow={false} className=" rounded-none ">
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}

              label="Search Items"
              icon={<MagnifyingGlassIcon className="h-5 w-5 translate-y-[5px]" />}
            />
          </div>
        </div>

      </CardHeader>
      {itemsData.length === 0 && !loading
        ?
        <div className="flex flex-1 h-full justify-center items-center">
          <Typography color="gray" className="mt-1 font-normal text-center">
            No items available for sale. <br className='block' /> To add items, kindly navigate to your inventory page.
          </Typography>
        </div>
        :
        <CardBody className={`overflow-scroll flex flex-wrap gap-x-10 gap-y-5 flex-1 ${loading ? "h-full justify-center items-center" : "justify-around"}`}>
          {loading ? <Spinner className="w-20 h-20 pt-3" />
            :
            itemsData.map((item) => (
              <ItemCard
                key={item.id}
                data={item}
                setCheckoutItems={setCheckoutItems}
              />
            ))
          }
        </CardBody>
      }

    </Card>
  );
}

export default ItemsList