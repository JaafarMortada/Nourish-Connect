
const UserInfoCard = ({ icon, title, info = [] }) => {
    return (
        <div className="flex min-w-[300px] items-center gap-5">
            <div className="w-8">
                <span className="text-[--primary]">{icon}</span>
            </div>
            <div className="flex flex-col">
                <span className="text-[16px] ">
                    {title}
                </span>

                {info.map((line, index) => (
                    <span key={index} className="text-black text-[21px] font-normal">
                        {line}
                    </span>
                ))}

            </div>
        </div>
    )
}

export default UserInfoCard