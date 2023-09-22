import axios from "axios";

export const websocketRequest = async ({
  inventoryId,

}) => {
  if (!inventoryId) throw Error("inventoryId required");

  try {
    const response = await axios.request({
      method: "GET",
      url: `http://localhost:6001/ws/trigger-event?inventory_id=${inventoryId}`,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
