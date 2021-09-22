import  { FC, useContext } from "react";
import { GlobalContext } from "../../context/ContextProvider";

const TeacherHome: FC = (props) => {
  const { stateAuth } =
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
