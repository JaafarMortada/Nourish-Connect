import { Avatar } from "@material-tailwind/react"
import { profile_pic_no_cover } from "../../../assets"

const CharityCard = ( {data} ) => {
  return (
    <div className="bg-white p-5 shadow-lg rounded-lg w-[300px] flex gap-5 items-center">
        <Avatar withBorder={true} src={data.pic_url ? `http://127.0.0.1:8000/storage/${data.pic_url}` : profile_pic_no_cover} variant="rounded" className=" p-[3px]"/>
        <span className="font-bold">{data.company_name}</span>
    </div>
  )
}

export default CharityCard