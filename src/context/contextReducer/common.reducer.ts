import { commonTypes } from "../../types";
const initStateCommon: commonTypes.IinitState = {
  loader: false,
  notificationMessage: {
    status: false,
    message: "",
  },
};

const commonReducer = (
  init: commonTypes.IinitState,
  action: commonTypes.ActionCommon
): commonTypes.IinitState => {
  if (action.type === commonTypes.ActionTypesCommon.LOADER) {
    return {
      ...init,
      loader: action.payload,
    };
  }

  if (action.type === commonTypes.ActionTypesCommon.NOTIFICATION_MESSAGE) {
    return {
      ...init,
      notificationMessage: action.payload,
    };
  }

  return init;
};

export { initStateCommon, commonReducer };
