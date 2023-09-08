import { Sidebar } from "../../components"
import { styles } from "../../constants"
const Donations = () => {
  return (
    <>
        <div className="flex ">
            <div className="w-[290px]">
                <Sidebar />
            </div>
            
            <div className={styles.pageContainer}>
                <div className={styles.pageHeaderText}>
                  Donations
                </div>

            </div>
        </div>
    </>
    
  )
}

export default Donations