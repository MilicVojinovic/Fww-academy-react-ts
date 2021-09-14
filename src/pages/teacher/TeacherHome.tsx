import React, { FC, useContext, useEffect, useState } from "react";
import { api } from "../../api/api";
import { LoggedUser } from "../../common/models/models";
import { GlobalContext } from "../../context/ContextProvider";
import { ActionTypesCommon } from "../../types/common.types";

const TeacherHome: FC = (props) => {
  const { stateAuth, dispatchAuth, stateCommon, dispatchCommon } =
    useContext(GlobalContext);

  return (
    <div className="teacher flex w-full h-full p-5 bg-blue-50">
      <div className="flex flex-col">
        <div className="mb-3">Vaši podaci</div>
        <div className="mb-3">Ime : {stateAuth.user.name}</div>
        <div className="mb-3">Prezime : {stateAuth.user.surname}</div>
        <div className="mb-3">E-mail : {stateAuth.user.email}</div>
      </div>
    </div>
  );
};

export default TeacherHome;
