import Axios from "axios";

export const getAllCustomers = async () => {
  const { data } = await Axios.get("http://localhost:3000/customers/", {
    headers: { "Access-Control-Allow-Origin": "*" },
    crossorigin: true
  });
  return data;
};
