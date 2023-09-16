import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Avatar,
  } from "@material-tailwind/react";
  import { useEffect, useState } from "react";
  import { useStoreData } from "../../../global/store";
  import { sendRequest } from "../../../config/request";
  import PrimaryButton from "../../ui/Button";
  import { default_profile_pic } from "../../../assets";
  import AddCashierModal from "../../modals/addCashier/AddCashierModal";
  import moment from "moment"
  
  
  const TABLE_HEAD = ["Title", "Number of Products", "Donated At", "Donated To"];
  
  const ManagersDonationsOverview = () => {
  
    const { store } = useStoreData()
    // const [open, setOpen] = useState(false);
    
    const [donationsData, setDonationsData] = useState([])
  
    // const handleOpen = () => setOpen(!open);
  
    useEffect(() => {
      const getDonationsData = async () => {
        try {
          const response = await sendRequest({
              method: "GET",
              route: "/api/manager/get_donations_data",
          });
          if(response.message === "success"){
              setDonationsData(response.donations);
          }
      } catch (error) {
          console.log(error);
      }
      }
      getDonationsData()
    }, [])
  

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
        {donationsData.length === 0
          ?
          <div className="flex flex-1 h-full justify-center items-center">
            <Typography color="gray" className="mt-1 font-normal text-center">
              You have not made any donation yet. <br className='block' /> Browse the suggestions to approve and make a donations.
            </Typography>
          </div>
          :
          <CardBody className="overflow-scroll px-0 flex-1">
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
                  ({ title, number_of_products, donated_at, donated_to}, index) => {
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
                            {donated_at}
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
            </table>
          </CardBody>}
  
      </Card>
          
      </>
    );
  }
  
  export default ManagersDonationsOverview