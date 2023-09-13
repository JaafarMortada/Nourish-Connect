import { Avatar } from "@material-tailwind/react"
import { default_profile_pic } from "../../assets"

const ContactCard = ({ headerCard = false }) => {
    return (
        <div className={`flex items-center gap-4 pl-2 rounded-t-md flex-1 ${headerCard ? "" : "hover:bg-[#2c2c2c] cursor-pointer"} `}>
            <Avatar src={default_profile_pic} alt="avatar" />
            <div className={`flex flex-1 flex-col justify-center ${headerCard ? "" : "border-b-[1px] border-gray-700 pb-2"}`}>
                <span className={`text-[--text-gray] ${headerCard ? "text-[27px] max-w-[400px]" : "text-[21px] max-w-[200px]"}]  truncate font-bold `}>username</span>
                {
                    headerCard ? null :
                        <span className="text-[--text-gray] max-w-[170px] truncate">last message</span>
                }
            </div>
        </div>
    )
}

export default ContactCard