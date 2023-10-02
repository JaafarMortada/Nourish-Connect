import { Avatar } from "@material-tailwind/react"
import { default_profile_pic } from "../../assets"
import { baseStorageURL } from "../../constants"

const ContactCard = ({ headerCard = false, data, handleContactClick }) => {
    return (
        <div 
            className={`flex items-center gap-4 pl-2 rounded-t-md flex-1 ${headerCard ? "" : "hover:bg-[#2c2c2c] cursor-pointer"} `}
            onClick={() => {
                if(!headerCard) handleContactClick(data.id, data)
            }}>
            <Avatar 
                src={data && data.pic_url ? `${baseStorageURL}${data.pic_url}` : default_profile_pic} 
                alt={`${data.company_name}'s profile picture`} 
            />
            <div className={`flex flex-1 py-4 flex-col justify-center ${headerCard ? "" : "border-b-[1px] border-gray-700 "}`}>
                <span className={`text-[--text-gray] ${headerCard ? "text-[27px] max-w-[400px]" : "text-[21px] max-w-[200px]"}]  truncate font-bold `}>{data && data.company_name}</span>
                {/* {
                    headerCard ? null :
                        <span className="text-[--text-gray] max-w-[170px] truncate">last message</span>
                } */}
            </div>
        </div>
    )
}

export default ContactCard