import React from "react";
import Input from "../../../common/components/Input";

export default function LoginForm() {
    return (
            <div className="login-form text-white bg-blue-400 py-4 w-3/12 flex flex-col justify-center items-center rounded-xl">
                <Input
                    classNameProp="mt-8"
                    placeholder={"E-mail"}
                    type={"string"}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    classNameProp="my-8"
                />
                <div className="w-full flex flex-col items-center">
                    {/* <Button text="Prijavi se" @click="$emit('signIn', login)" :validate="$v.login.$invalid" class="bg-blue-800 w-6/12 text-lg h-8 p-4 mb-5" /> */}
                    {/* <Button text="Registruj se" @click="$router.push('/register')" class="bg-indigo-900 w-4/12 text-sm  h-6 py-1 px-2 mb-3" /> */}
                </div>
            </div>
    );
}
