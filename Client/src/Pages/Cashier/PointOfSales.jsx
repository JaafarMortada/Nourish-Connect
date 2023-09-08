import { Sidebar } from "../../components"
import { styles } from "../../constants"
const PointOfSales = () => {
  return (
    <>
        <div className="flex ">
            <div className="w-[290px]">
                <Sidebar />
            </div>
            
            <div className={styles.pageContainer}>
                <div className={styles.pageHeaderText}>
                  Point Of Sales
                </div>

            </div>
        </div>
    </>
    
  )
}

export default PointOfSales