import { DiscountSuggestions, DiscountsTable, Sidebar } from "../../components"
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
                <div className="w-full flex-1 h-full flex flex-col gap-5 items-center mb-5">
                  <DiscountSuggestions />
                  <DiscountsTable />
                </div>
            </div>
        </div>
    </>
    
  )
}

export default Discounts