import { authTypes } from "../../types";
const initStateAuth: authTypes.IinitState = {
  user: {},
};

const authReducer = (
  init: authTypes.IinitState,
  action: authTypes.ActionAuth
): authTypes.IinitState => {
  if (action.type === authTypes.ActionTypesAuth.USER) {
    return {
      ...init,
      user: action.payload,
    };
  }

  return init;
};

export { initStateAuth, authReducer };
