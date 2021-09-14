import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserGraduate,
    faGlobeAfrica,
    faIndustry,
} from "@fortawesome/free-solid-svg-icons";
import RegisterForm from "./components/RegisterForm";





function Register() {


	
    return (
        <div className="register bg-blue-200 w-full h-full flex items-center justify-center">
            <div className="w-5/12 md:w-3/12">
                <div className="flex items-center flex-col relative">
                    <FontAwesomeIcon
                        icon={faUserGraduate}
                        className="text-5xl mb-2"
                    />
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
                <RegisterForm></RegisterForm>
            </div>
        </div>
    );
}

export default Register;
