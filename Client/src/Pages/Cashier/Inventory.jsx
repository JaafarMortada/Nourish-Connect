import { InventoryCard, Sidebar } from "../../components"
import ItemsTable from "../../components/cards/tables/ItemsTable"
import { styles } from "../../constants"
const Inventory = () => {
  return (
    <>
        <div className="flex ">
            <div className="w-[290px]">
                <Sidebar />
            </div>
            
            <div className={styles.pageContainer}>
                <div className={styles.pageHeaderText}>
                  Inventory
                </div>
                <ItemsTable />
            </div>
        </div>
    </>
    
  )
}

export default Inventory