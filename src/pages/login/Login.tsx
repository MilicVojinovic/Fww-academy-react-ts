import { useContext, useReducer } from "react";
import { GlobalContext } from "../../context/ContextProvider";
import LoginForm from "./components/LoginForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faGlobeAfrica,
  faIndustry,
} from "@fortawesome/free-solid-svg-icons";

function Login() {
  const { stateAuth, dispatchAuth, stateCommon, dispatchCommon } =
    useContext(GlobalContext);

  return (
    <div className="login bg-blue-200 w-full h-full flex flex-col items-center justify-center">
      <div className="w-5/12 md:w-3/12">
        <div className="flex items-center flex-col relative">
          <FontAwesomeIcon icon={faUserGraduate} className="text-5xl mb-2" />
          <FontAwesomeIcon
            icon={faGlobeAfrica}
            className="text-7xl text-blue-400 rotateIn"
          />
          <FontAwesomeIcon
            icon={faIndustry}
            className="text-7xl text-blue-400 rotateOut"
          />
          <span className="text-xl mt-1 mb-8 tracking-wider font-bold border-b-4 border-black">
            fww academy
          </span>
        </div>
      </div>
      <LoginForm />
    </div>
  );
}

export default Login;
