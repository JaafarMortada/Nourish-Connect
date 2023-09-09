import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  Avatar,
} from "@material-tailwind/react";
import { useState } from "react";
import PrimaryButton from "../../ui/Button";
import AddCashierModal from "../../modals/addCashier/AddCashierModal";

const TABLE_HEAD = ["Username & Email", "Employed", "Status"];

const TABLE_ROWS = [
  // {
  //     img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
  //     name: "John Michael",
  //     email: "john@creative-tim.com",
  //     job: "Manager",
  //     org: "Organization",
  //     online: true,
  //     date: "23/04/18",
  //   },
];


const Table = () => {

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
    <AddCashierModal open={open} handleOpen={handleOpen}/>

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
      {TABLE_ROWS.length === 0
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
              {TABLE_ROWS.map(
                ({ img, name, email, online, date }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "px-4"
                    : "px-4 border-b border-blue-gray-50";

                  return (
                    <tr key={name} className={`${index % 2 === 0 ? "" : "bg-blue-gray-50/50"}`}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={img} alt={name} size="sm" />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
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
                          {date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={online ? "online" : "offline"}
                            color={online ? "green" : "blue-gray"}
                          />
                        </div>
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