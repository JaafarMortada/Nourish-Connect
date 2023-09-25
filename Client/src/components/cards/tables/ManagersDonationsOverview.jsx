import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Spinner,

} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useStoreData } from "../../../global/store";
import { sendRequest } from "../../../config/request";
import { usePusher } from "../../../global/PusherContext";
import moment from "moment"


const TABLE_HEAD = ["Title", "Number of Products", "Donated At", "Donated To"];

const ManagersDonationsOverview = () => {

  const { store } = useStoreData()
  const [loading, setLoading] = useState(true);

  const [donationsData, setDonationsData] = useState([])

  const getDonationsData = async () => {
    try {
      const response = await sendRequest({
        method: "GET",
        route: "/api/manager/get_donations_data",
      });
      if (response.message === "success") {
        setDonationsData(response.donations);
        setLoading(false)
      } 
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getDonationsData()
  }, [])

  const pusher = usePusher();
  const pusherEvent = () => {

      const channel = pusher.subscribe(`user-donation-${store.inventory_id}`);
      channel.bind('donations-data-updated', () => {
        getDonationsData()
      })

      return () => {
          channel.unbind_all();
          channel.unsubscribe();
      };
  }

  useEffect(() => {
      pusherEvent()
    }, [store])

  return (
    <>

      <Card className="flex flex-col h-[40%] w-[95%]">
        <CardHeader floated={false} shadow={false} className="rounded-none ">
          <div className="mb-4 h-fit flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Donations Overview
              </Typography>
            </div>
          </div>

        </CardHeader>
        {donationsData.length === 0 && !loading
          ?
          <div className="flex flex-1 h-full justify-center items-center">
            <Typography color="gray" className="mt-1 font-normal text-center">
              You have not made any donation yet. <br className='block' /> Browse the suggestions to approve and make a donations.
            </Typography>
          </div>
          :
          <CardBody className={`overflow-scroll px-0 flex-1 ${loading ? "flex w-full h-full items-center justify-center" : ""} `}>
            {loading ? <Spinner className="w-20 h-20 pt-3" />
              :
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
                  {donationsData.map(
                    ({ title, number_of_products, donated_at, donated_to }, index) => {
                      const isLast = index === donationsData.length - 1;
                      const classes = isLast
                        ? "px-4"
                        : "px-4 border-b border-blue-gray-50";

                      return (
                        <tr key={index} className={`${index % 2 === 0 ? "" : "bg-blue-gray-50/50"}`}>
                          <td className={classes}>

                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {title}
                            </Typography>

                          </td>

                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {number_of_products}
                            </Typography>
                          </td>

                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {moment(donated_at).format('LLLL')}

                            </Typography>
                          </td>
                          <td className={classes}>

                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {donated_to}
                            </Typography>
                          </td>

                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>}
          </CardBody>}

      </Card>

    </>
  );
}

export default ManagersDonationsOverview