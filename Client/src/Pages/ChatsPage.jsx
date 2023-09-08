import { Sidebar } from "../components"
import { styles } from "../constants"
const ChatsPage = () => {
  return (
    <>
        <div className="flex ">
            <div className="w-[290px]">
                <Sidebar />
            </div>
            
            <div className={styles.pageContainer}>

            </div>
        </div>
    </>
    
  )
}

export default ChatsPage