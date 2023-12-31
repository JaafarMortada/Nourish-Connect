import { Sidebar, CashiersTable } from "../../components"
import { styles } from "../../constants"

const CashiersList = () => {
  return (
    <>
        <div className="flex ">
            <div className="w-[290px]">
                <Sidebar />
            </div>
            
            <div className={styles.pageContainer}>
                <div className={styles.pageHeaderText}>
                  My Cashiers
                </div>
                  <CashiersTable />
            </div>
        </div>
    </>
  )
}

export default CashiersList