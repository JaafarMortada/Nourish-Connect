
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import CheckoutItemCard from "../miniCards/CheckoutItemCard";
import PrimaryButton from "../../ui/Button";

const Checkout = () => {

  return (
    <Card className="h-full w-[25%] ml-5">
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

          <CheckoutItemCard />

        </CardBody>
        </div>
        <div className="w-full h-[200px] rounded-b-lg border-t-2 border-[--background-black] flex flex-col justify-center items-center gap-2">
          <div>
            <span className="font-bold">Total: </span>
            <span>54$</span>
          </div>
          <PrimaryButton label={'Checkout'} classNames={"w-[80%] bg-[--primary]"}/>
        </div>
      
    </Card>
  );
}

export default Checkout