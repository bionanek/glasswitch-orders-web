import Axios from "axios";

export const getAllCustomers = async () => {
  try {
    const data = await Axios.get("http://localhost:3001/customers/", {
      headers: { "Access-Control-Allow-Origin": "*" },
      crossorigin: true
    });
    return data;
  } catch (ex) {
    console.log(ex);
  }
};
