
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import CheckoutItemCard from "../miniCards/CheckoutItemCard";
import PrimaryButton from "../../ui/Button";
import { useEffect, useState } from "react";

const Checkout = ({ data, setCheckoutItems, handleRemoveFromCheckout, handleQuantity, checkoutRequest, error }) => {
  const [total, setTotal] = useState(0)
  useEffect(()=>{
    let new_total = 0;

    data.forEach((item) => {
      new_total += item.price * item.quantityToCheckout;
    });

    setTotal(new_total);
  }, [data])
  return (
    <Card className="h-[97%] w-[25%] ml-5 flex flex-col justify-between">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Checkout
            </Typography>
          </div>

        </div>

      </CardHeader>
      <div className="overflow-scroll">
        <CardBody className="overflow-scroll px-0 pt-0 flex flex-col gap-5 items-center">
          {
            data.map((item) => (
              <CheckoutItemCard key={item.unique_id} data={item}
                setCheckoutItems={setCheckoutItems}
                removeFromCart={handleRemoveFromCheckout}
                handleQuantity={handleQuantity}
              />
            ))
          }
        </CardBody>
      </div>
      <div className="w-full min-h-[130px] rounded-b-lg border-t-2 border-[--background-black] flex flex-col justify-center items-center gap-2">
        <div>
          <span className="font-bold">Total: </span>
          <span>{total}$</span>
        </div>
        <PrimaryButton label={`${error ? "An error occurred" : "Checkout"}`} classNames={`w-[80%] ${ error ? "bg-red-500" : "bg-[--primary]"}`} onClick={checkoutRequest} />
      </div>

    </Card>
  );
}

export default Checkout