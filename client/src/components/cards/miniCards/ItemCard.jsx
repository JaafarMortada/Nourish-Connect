import { Tooltip } from "@material-tailwind/react";
import { notFound } from "../../../assets";
import { PlusIcon } from "@heroicons/react/24/solid";
import { baseStorageURL } from "../../../constants";
const ItemCard = ({ data, setCheckoutItems }) => {
    return (
        <div className="flex items-center rounded-lg h-[60px] w-[220px] bg-[#E0F8EA] text-[--text-black]">
            <img
                src={data.pic_url ? `${baseStorageURL}${data.pic_url}` : notFound}
                className="w-10  h-10 mx-2 rounded-md bg-[--accent]"
                alt={`${data.name} picture`}
            />
            <div className="flex flex-col ">
                <Tooltip content={data.name} className="bg-[--primary]">
                    <span className="text-[--text-black] text-[21px] truncate w-[110px]">{data.name}</span>
                </Tooltip>
                <span className="text-gray-700 text-[16px]">${data.price.toFixed(2)}</span>
            </div>
            <div className="flex flex-1 justify-center">
                {
                    data.available_quantity === 0
                        ?
                        null
                        :
                        <Tooltip className="bg-[--primary]" content={'Add to Cart'}>
                            <PlusIcon
                                className="w-[30px] h-[30px] text-[--primary] hover:scale-[1.2] transition-all cursor-pointer"
                                onClick={() => setCheckoutItems(data)}
                            />
                        </Tooltip>
                }

            </div>
        </div>
    )
}

export default ItemCard