import { useContext, useEffect } from "react";
import { api } from "../api/api";
import { GlobalContext } from "../context/ContextProvider";

const useFetchHook = (
  URL: string,
  dispatchFunction: any,
  dispatchType: any
) => {
  const { changeLoaderState, changeNotifMessageState } =
    useContext(GlobalContext);

  useEffect(() => {
    let fetchData = async () => {
      changeLoaderState(true);
      try {
        const res = await api.get(URL);
        dispatchFunction({
          type: dispatchType,
          payload: res.data,
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
    fetchData();

    return () => {
      console.log("unmount useFetchHook");
    };
  }, [
    changeLoaderState,
    changeNotifMessageState,
    URL,
    dispatchFunction,
    dispatchType,
  ]);
};

export default useFetchHook;
