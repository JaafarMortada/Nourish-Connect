import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
  } from "@heroicons/react/24/outline";
  import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
  import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
  } from "@material-tailwind/react";
import ItemCard from "../miniCards/ItemCard";

const ItemsList = () => {

    const TABS = [
        {
          label: "All",
          value: "all",
        },
        {
          label: "Monitored",
          value: "monitored",
        },
        {
          label: "Unmonitored",
          value: "unmonitored",
        },
      ];
       
      const TABLE_HEAD = ["Member", "Function", "Status", "Employed", ""];
       
      const TABLE_ROWS = [
        {
          img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
          name: "John Michael",
          email: "john@creative-tim.com",
          job: "Manager",
          org: "Organization",
          online: true,
          date: "23/04/18",
        },
        {
          img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
          name: "Alexa Liras",
          email: "alexa@creative-tim.com",
          job: "Programator",
          org: "Developer",
          online: false,
          date: "23/04/18",
        },
        {
          img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
          name: "Laurent Perrier",
          email: "laurent@creative-tim.com",
          job: "Executive",
          org: "Projects",
          online: false,
          date: "19/09/17",
        },
        {
          img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
          name: "Michael Levi",
          email: "michael@creative-tim.com",
          job: "Programator",
          org: "Developer",
          online: true,
          date: "24/12/08",
        },
        {
          img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
          name: "Richard Gran",
          email: "richard@creative-tim.com",
          job: "Manager",
          org: "Executive",
          online: false,
          date: "04/10/21",
        },
      ];
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
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </CardBody>
      
    </Card>
  );
}

export default ItemsList