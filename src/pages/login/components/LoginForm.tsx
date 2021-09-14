import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../../common/components/Button";
import Input from "../../../common/components/Input";
import { GlobalContext } from "../../../context/ContextProvider";
import { api } from "../../../api/api";
import SHA512 from "crypto-js/sha512";
import { ActionTypesCommon } from "../../../types/common.types";
import { TOKEN_LS_NAME } from "../../../constants/constants";
import { ActionTypesAuth } from "../../../types/auth.types";
import { LoggedUser } from "../../../common/models/models";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { stateAuth, dispatchAuth, stateCommon, dispatchCommon } =
    useContext(GlobalContext);

  const history = useHistory();

  function emailHandler(val: any) {
    setEmail(val.value);
  }

  function passwordHandler(val: any) {
    setPassword(val.value);
  }

  function loaderState(state: boolean) {
    dispatchCommon({
      payload: state,
      type: ActionTypesCommon.LOADER,
    });
  }

  function notifMessageState(state: { status: any; message: string }) {
    dispatchCommon({
      payload: state,
      type: ActionTypesCommon.NOTIFICATION_MESSAGE,
    });
  }

  function saveUser(user: LoggedUser) {
    dispatchAuth({
      payload: user,
      type: ActionTypesAuth.USER,
    });
  }

  async function signIn(val: any) {
    let payload = {
      email,
      password: SHA512(password).toString(),
    };

    loaderState(true);

    try {
      const user = await api.post("/login", payload);
	  history.push("/teacher-home");
	  localStorage.setItem(TOKEN_LS_NAME, user.data['session-id']);
	  saveUser(user.data);
      loaderState(false);
    //   notifMessageState({
    //     status: user,
    //     message: "LOGGED",
    //   });
    } catch (error) {
      loaderState(false);
      notifMessageState({
        status: error,
        message: "",
      });
    }
  }

  return (
    <div className="login-form text-white bg-blue-400 py-4 w-3/12 flex flex-col justify-center items-center rounded-xl">
      <Input
        classNameProp="mt-8"
        placeholder={"E-mail"}
        type={"string"}
        inputHandler={emailHandler}
      />
      <Input
        type="password"
        placeholder="Password"
        classNameProp="my-8"
        inputHandler={passwordHandler}
      />
      <div className="w-full flex flex-col items-center">
        <Button
          text="Prijavi se"
          click={signIn}
          classNameProp="bg-blue-800 w-6/12 text-lg h-8 p-4 mb-5"
        />
        <Button
          text="Registruj se"
          click={() => {
            return history.push("/register");
          }}
          classNameProp="bg-indigo-900 w-4/12 text-sm  h-6 py-1 px-2 mb-3"
        />
      </div>
    </div>
  );
}
