import { Checkout, ItemsList, ReceiptsTable, Sidebar, UploadSalesData } from "../../components"
import { styles } from "../../constants"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { sendRequest } from "../../config/request";
import { useStoreData } from "../../global/store";
const PointOfSales = () => {

  const [checkoutItems, setCheckoutItems] = useState([])
  const { store, setStoreData } = useStoreData()
  const [error, setError] = useState(false)
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
    setCheckoutItems(checkoutItems.filter((item) => item.unique_id !== itemToRemove.unique_id));
  };

  const handleError = () => {
    setError(true)
    setTimeout(() => {
      setError(false);
    }, 3000)
  }
  const checkoutRequest = async () => {
    if (checkoutItems.length > 0) {
      const receipt = []
      checkoutItems.forEach((item) => {
        receipt.push({ id: item.id, quantity: item.quantityToCheckout });
      });
      const formData = new FormData();
      formData.append('inventory_id', checkoutItems[0].inventory_id);
      formData.append('receipt', JSON.stringify(receipt));
      try {
        const response = await sendRequest({
          method: "POST",
          route: "/api/cashier/items/checkout",
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
          token: store.token
        });
        if (response.message === "success") {
          setCheckoutItems([])
        } else {
          handleError()
        }
      } catch (error) {
        handleError()
      }
    } else {
      handleError()
    }

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
              <ItemsList setCheckoutItems={handleAddToCheckout} />
              <ReceiptsTable />
            </div>
            <Checkout
              data={checkoutItems}
              handleRemoveFromCheckout={handleRemoveFromCheckout}
              handleQuantity={handleQuantity}
              checkoutRequest={checkoutRequest}
              error={error}
              setError={setError}
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