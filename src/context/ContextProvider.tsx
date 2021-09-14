import { FC, createContext, useReducer } from "react";
import Loader from "../common/components/Loader";
import NotificationMessage from "../common/components/NotificationMessage";
import { authTypes, commonTypes } from "../types";

import { initStateAuth, authReducer } from "./contextReducer/auth.reducer";
import {
  initStateCommon,
  commonReducer,
} from "./contextReducer/common.reducer";

interface GlobalContextInterface {
	stateAuth: authTypes.IinitState;
	dispatchAuth: React.Dispatch<authTypes.ActionAuth>;
	stateCommon: commonTypes.IinitState;
	dispatchCommon: React.Dispatch<commonTypes.ActionCommon>;
	
}

export const GlobalContext = createContext<any | null>(null);

const ContextProvider: FC = ({ children }) => {


  const [stateAuth, dispatchAuth] = useReducer(authReducer, initStateAuth);
  const [stateCommon, dispatchCommon] = useReducer(
    commonReducer,
    initStateCommon
  );

  
  return (
    <GlobalContext.Provider
      value={{
        stateAuth,
        dispatchAuth,
        stateCommon,
        dispatchCommon,
      }}
    >
      {stateCommon.loader && <Loader></Loader>}
      {stateCommon.notificationMessage.status && (
        <NotificationMessage></NotificationMessage>
      )}
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
