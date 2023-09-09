import { Checkout, ItemsList, ReceiptsTable, Sidebar, UploadSalesData } from "../../components"
import { styles } from "../../constants"

const PointOfSales = () => {

  return (
    <>
      <div className="flex ">
        <div className="w-[290px]">
          <Sidebar />
        </div>

        <div className={styles.pageContainer}>
          <div className={`${styles.pageHeaderText} `}>
            Point Of Sales
          </div>
          <div className="w-full min-h-[85%] flex justify-center">
            <div className="flex flex-col gap-5 w-[70%] min-h-[full] ">
              <ItemsList />
              <ReceiptsTable />
            </div>
            <Checkout />
          </div>
          <div className="w-full h-[85%] flex justify-center mt-5 px-5">
            <UploadSalesData />

          </div>
        </div>
        
      </div>
    </>

  )
}

export default PointOfSales