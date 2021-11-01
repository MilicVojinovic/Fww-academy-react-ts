import { api } from "../api/api";
import queryString from "query-string";

const fetchData = async (
  filters: any,
  changeLoaderState: any,
  dispatchFunction: any,
  dispatchType: any,
  changeNotifMessageState: any,
  URL: any
) => {
  changeLoaderState(true);
  try {
    const query = queryString.stringify(filters, { skipNull: true });
    const user = await api.get(URL + query);

    dispatchFunction({
      type: dispatchType,
      payload: user.data,
    });
    changeLoaderState(false);
  } catch (error) {
    changeLoaderState(false);
    changeNotifMessageState({
      status: error,
      message: "",
    });
  }
};

export default fetchData;
