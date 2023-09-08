import { Sidebar } from "../../components"
import { styles } from "../../constants"
const Discounts = () => {
  return (
    <>
        <div className="flex ">
            <div className="w-[290px]">
                <Sidebar />
            </div>
            
            <div className={styles.pageContainer}>
                <div className={styles.pageHeaderText}>
                  Discounts
                </div>

            </div>
        </div>
    </>
    
  )
}

export default Discounts