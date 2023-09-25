import { Avatar } from "@material-tailwind/react"
import { profile_pic_no_cover } from "../../../assets"
import { baseStorageURL } from "../../../constants"

const CharityCard = ( {data, handleZoomIn} ) => {

  return (
    <div 
      className="bg-white p-5 shadow-lg rounded-lg w-[300px] flex gap-5 items-center hover:scale-105 hover:translate-x-5 transition-all cursor-pointer"
      onClick={() => handleZoomIn([data.latitude, data.longitude])}
    >
        <Avatar withBorder={true} src={data.pic_url ? `${baseStorageURL}${data.pic_url}` : profile_pic_no_cover} variant="rounded" className=" p-[3px]"/>
        <span className="font-bold">{data.company_name}</span>
    </div>
  )
}

export default CharityCard