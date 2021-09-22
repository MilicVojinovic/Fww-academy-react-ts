import { FC, createContext, useReducer, useCallback } from "react";
import Loader from "../common/components/Loader";
import NotificationMessage from "../common/components/NotificationMessage";
import { ActionTypesCommon } from "../types/common.types";

import { initStateAuth, authReducer } from "./contextReducer/auth.reducer";
import {
  initStateCommon,
  commonReducer,
} from "./contextReducer/common.reducer";
import {
  initStateTeacher,
  teacherReducer,
} from "./contextReducer/teacher.reducer";

// interface GlobalContextInterface {
//   stateAuth: authTypes.IinitState;
//   dispatchAuth: React.Dispatch<authTypes.ActionAuth>;
//   stateCommon: commonTypes.IinitState;
//   dispatchCommon: React.Dispatch<commonTypes.ActionCommon>;
//   stateTeacher: teacherTypes.IinitState;
//   dispatchTeacher: React.Dispatch<teacherTypes.ActionTeacher>;
// }

export const GlobalContext = createContext<any | null>(null);

const ContextProvider: FC = ({ children }) => {
  const [stateAuth, dispatchAuth] = useReducer(authReducer, initStateAuth);

  const [stateCommon, dispatchCommon] = useReducer(
    commonReducer,
    initStateCommon
  );

  const changeLoaderState = useCallback(
    (state: boolean) => {
      dispatchCommon({
        payload: state,
        type: ActionTypesCommon.LOADER,
      });
    },
    [dispatchCommon]
  );

  const changeNotifMessageState = useCallback(
    (state: { status: any; message: string }) => {
      dispatchCommon({
        payload: state,
        type: ActionTypesCommon.NOTIFICATION_MESSAGE,
      });
    },
    [dispatchCommon]
  );

  const [stateTeacher, dispatchTeacher] = useReducer(
    teacherReducer,
    initStateTeacher
  );

  return (
    <GlobalContext.Provider
      value={{
        stateAuth,
        dispatchAuth,
        stateCommon,
        dispatchCommon,
		changeLoaderState,
		changeNotifMessageState,
		stateTeacher,
		dispatchTeacher
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
