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


const TABLE_HEAD = ["Username & Email", "Employed At", "Last Login", "Number of Logins"];

const Table = () => {

  const { store } = useStoreData()
  const [open, setOpen] = useState(false);
  const [cashiersData, setCashiersData] = useState([])

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const getCashiers = async () => {
      try {
        const response = await sendRequest({
            method: "GET",
            route: "/api/manager/get_cashiers",
            token: store.token,
        });
        if(response.message === "success"){
            setCashiersData(response.cashiers);
        }
    } catch (error) {
        console.log(error);
    }
    }
    getCashiers()
  }, [])

  const handleAddedCashier = (newData) => {
    setCashiersData((prevCashiersData) => [
      ...prevCashiersData,
      newData,
    ])
    
  }
  return (
    <>
    <AddCashierModal open={open} handleOpen={handleOpen} handleNewCashier={handleAddedCashier}/>

    <Card className="flex flex-col h-[80%] w-[95%]">
      <CardHeader floated={false} shadow={false} className="rounded-none ">
        <div className="mb-4 h-fit flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Cashiers list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all your cashiers
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col sm:flex-row">
            <PrimaryButton classNames="flex items-center bg-[--primary]" size="sm" label='Add Cashier' onClick={handleOpen}/>
          </div>
        </div>

      </CardHeader>
      {cashiersData.length === 0
        ?
        <div className="flex flex-1 h-full justify-center items-center">
          <Typography color="gray" className="mt-1 font-normal text-center">
            You have no registered cashiers. <br className='block' /> Click the button above to add a new cashier account
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
              {cashiersData.map(
                ({ pic_url, username, email, login_count, most_recent_login, created_at}, index) => {
                  const isLast = index === cashiersData.length - 1;
                  const classes = isLast
                    ? "px-4"
                    : "px-4 border-b border-blue-gray-50";

                  return (
                    <tr key={email} className={`${index % 2 === 0 ? "" : "bg-blue-gray-50/50"}`}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={pic_url ? `http://127.0.0.1:8000/storage/${pic_url}` : default_profile_pic} alt={username} size="sm" />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {username}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {moment(created_at).format('LLLL')}
                        </Typography>
                      </td>

                      <td className={classes}>
                      <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {most_recent_login ? moment(most_recent_login).format('LLLL') : "No recent logins"}
                        </Typography>
                      </td>
                      <td className={classes}>

                      <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {login_count}
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

export default Table