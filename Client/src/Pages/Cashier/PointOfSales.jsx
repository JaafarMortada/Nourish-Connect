import { Checkout, ItemsList, ReceiptsTable, Sidebar, UploadSalesData } from "../../components"
import { styles } from "../../constants"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const PointOfSales = () => {

  const [checkoutItems, setCheckoutItems] = useState([])
  const handleAddToCheckout = (data) => {
    const uniqueId = uuidv4();
    const dataWithAutoId = { ...data, unique_id: uniqueId, quantityToCheckout: 1 };
    setCheckoutItems([...checkoutItems, dataWithAutoId])
  }

  const handleQuantity = (data, action) => {
    setCheckoutItems((prevItems) =>
    prevItems.map((item) => {
      if (item.unique_id === data.unique_id) {
        if (action === "increment") return { ...item, quantityToCheckout: item.quantityToCheckout + 1 };
        if (action === "decrement") return { ...item, quantityToCheckout: item.quantityToCheckout - 1 };
      }
      return item;
    })
  );
  }

  const handleRemoveFromCheckout = (itemToRemove) => {
    console.log(itemToRemove)
    setCheckoutItems(checkoutItems.filter((item) => item.unique_id !== itemToRemove.unique_id));
  };

  const checkoutRequest = () => {
    
  }

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
              <ItemsList setCheckoutItems={handleAddToCheckout}/>
              <ReceiptsTable />
            </div>
            <Checkout 
              data={checkoutItems} 
              handleRemoveFromCheckout={handleRemoveFromCheckout}
              handleQuantity={handleQuantity}
              checkoutRequest={checkoutRequest}
            />
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