import { Sidebar } from "../../components"
import { styles } from "../../constants"
const Dashboard = () => {
  return (
    <>
        <div className="flex ">
            <div className="w-[290px]">
                <Sidebar />
            </div>
            
            <div className={styles.pageContainer}>
                <div className={styles.pageHeaderText}>
                  Dashboard
                </div>

            </div>
        </div>
    </>
    
  )
}

export default Dashboard