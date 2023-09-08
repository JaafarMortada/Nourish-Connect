import { Sidebar } from "../../components"
import { styles } from "../../constants"
const CharitiesMap = () => {
  return (
    <>
        <div className="flex ">
            <div className="w-[290px]">
                <Sidebar />
            </div>
            
            <div className={styles.pageContainer}>
                <div className={styles.pageHeaderText}>
                  Charities Map
                </div>

            </div>
        </div>
    </>
    
  )
}

export default CharitiesMap