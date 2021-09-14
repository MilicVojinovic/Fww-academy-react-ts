import React, { Children, FC, useContext, useEffect } from "react";
import { Redirect, useHistory } from "react-router";
import { api } from "../../api/api";
import { ROLES } from "../../constants/constants";
import { GlobalContext } from "../../context/ContextProvider";
import { ActionTypesAuth } from "../../types/auth.types";
import { LoggedUser } from "../models/models";

const ProtectedRoute: FC<any> = ( props ) => {
  const history = useHistory();

  const { stateAuth, dispatchAuth, stateCommon, dispatchCommon } =
    useContext(GlobalContext);

  function saveUser(user: LoggedUser) {
    dispatchAuth({
      payload: user,
      type: ActionTypesAuth.USER,
    });
  }

  async function fetchUser() {
    try {
      const user = await api.get("/user/session");
      saveUser(user.data);
    } catch (error : any) {
	  if (error.response.data.errors === 'ERR_BAD_SESSION_ID') {
		  history.push("/login");
	  }
    }
  }

  useEffect(() => {
    if (Object.keys(stateAuth.user).length === 0) {
      fetchUser();
    }
  }, []);

  return (
    <div className="w-full h-full">
      {(stateAuth.user.role === ROLES.teacher || stateAuth.user.role === ROLES.student) && (<props.component></props.component>)}
    </div>
  );
};

export default ProtectedRoute;
