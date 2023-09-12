import { Spinner } from "@material-tailwind/react"
import { styles } from "../../constants"
import CharityCard from "../cards/miniCards/CharityCard"

const CharitiesMapList = ( {data = []} ) => {

    return (
        <div className="absolute min-w-[400px] h-[100vh] top-0 left-0 z-[400] bg-transparent-black-gradient flex flex-col pl-10">
            <div className={`${styles.pageHeaderText} text-white [text-shadow:_4px_4px_0_rgb(0_0_0_/_40%)] `}>
                Charities
            </div>
            <div className={`flex flex-col gap-3 h-full overflow-scroll pb-3 ${data.length === 0 ? "justify-center items-center" : ""}`}>
                {
                    data.length === 0 ?
                    <Spinner className="w-20 h-20" /> :
                    data.map((charity, index)=>(
                        <CharityCard key={index} data={charity} />
                    ))
                }
            </div>

        </div>
    )
}

export default CharitiesMapList