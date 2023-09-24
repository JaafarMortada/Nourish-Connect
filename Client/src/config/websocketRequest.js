import axios from "axios";

export const websocketRequest = async ({
  inventoryId,
  WSevent,
  receiver_id,

}) => {
  if (!(inventoryId || receiver_id) && !WSevent) throw Error("URL Error");
  const query = WSevent === 'items' ? `trigger-items-event?inventory_id=${inventoryId}` 
  : WSevent === "donation" ? `trigger-donation-event?receiver_id=${receiver_id}` 
  : WSevent ==="cashier-login" ? `trigger-cashier-login-event?inventory_id=${inventoryId}` 
  : WSevent ==="user-donation" ? `trigger-user-donation-event?inventory_id=${inventoryId}` 
  : WSevent ==="user-discount" ? `trigger-user-discount-event?inventory_id=${inventoryId}` 
  : ""

  try {
    const response = await axios.request({
      method: "GET",
      url: `http://localhost:6001/ws/${query}`,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
