import { Tooltip } from "@material-tailwind/react";
import { notFound } from "../../../assets";
import { TrashIcon, PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
const CheckoutItemCard = () => {
    return (
        <div className="flex items-center rounded-lg h-[100px] w-[240px] bg-[#E0F8EA] text-[--text-black]">
            <div className="flex flex-1 items-center h-full">
                <img src={notFound} className="min-w-10 h-10 mx-2 rounded-md bg-[--accent]" />
            </div>
            <div className="flex flex-col flex-1 h-full text-center items-center">
                <Tooltip content={'item name'} className="bg-[--primary]">
                    <span className="text-[--text-black] text-[21px] truncate w-[110px]">item name</span>
                </Tooltip>
                <span className="text-gray-700 text-[16px]">price</span>
                <div className="w-full flex pt-2 justify-between items-center">
                    <Tooltip className="bg-[--primary]" content={'Remove 1'}>
                        <MinusCircleIcon className="w-[30px] h-[30px] text-[--primary] hover:scale-[1.2] transition-all cursor-pointer" />
                    </Tooltip>
                    <span className="text-[--text-black] text-[21px] font-bold">2</span>
                    <Tooltip className="bg-[--primary]" content={'Add 1'}>
                        <PlusCircleIcon className="w-[30px] h-[30px] text-[--primary] hover:scale-[1.2] transition-all cursor-pointer" />
                    </Tooltip>
                </div>
            </div>
            <div className="flex flex-1 justify-center items-center h-full">
                <Tooltip className="bg-[--primary]" content={'Remove from Cart'}>
                    <TrashIcon className="w-[30px] h-[30px] text-[--primary] hover:scale-[1.2] transition-all cursor-pointer" />
                </Tooltip>
            </div>
        </div>
    )
}

export default CheckoutItemCard