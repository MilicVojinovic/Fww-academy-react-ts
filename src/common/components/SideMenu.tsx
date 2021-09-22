import { FC, useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { TOKEN_LS_NAME } from "../../constants/constants";
import { GlobalContext } from "../../context/ContextProvider";
import { authTypes } from "../../types";

const menuListTeacher = [
  {
    link: "/teacher-home",
    title: "Početna",
    icon: "fas fa-home",
  },
  {
    link: "/teacher-courses",
    title: "Lista Vaših kurseva",
    icon: "fas fa-list",
  },
  {
    link: "/students",
    title: "Studenti",
    icon: "fas fa-user-graduate",
  },
  {
    link: "/request-course",
    title: "Zahtevi za pohadjanje kursa",
    icon: "fa fa-reply-all",
  },
];

const menuListStudent = [
  {
    link: "/student-home",
    title: "Početna",
    icon: "fas fa-home",
  },
  {
    link: "/finished-courses",
    title: "Završeni kursevi",
    icon: "fas fa-check",
  },
  {
    link: "/current-courses",
    title: "Kursevi koje trenutno pohadjate",
    icon: "fas fa-question",
  },
  {
    link: "/all-courses",
    title: "Spisak kurseva koje niste pohadjali",
    icon: "fas fa-list",
  },
];

const SideMenu: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { stateAuth, dispatchAuth } = useContext(GlobalContext);

  const [menuList, setMenuList] = useState<
    | {
        link: string;
        title: string;
        icon: string;
      }[]
    | null
  >(null);

  const [menuClosed, setMenuClosed] = useState<boolean>(false);

  function logout() {
    localStorage.removeItem(TOKEN_LS_NAME);
    dispatchAuth({
      type: authTypes.ActionTypesAuth.USER,
      payload: "pera",
    });
    history.push("/login");
  }

  useEffect(() => {
    stateAuth.user.role === "teacher"
      ? setMenuList(menuListTeacher)
      : setMenuList(menuListStudent);
  }, [stateAuth, setMenuList]);

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <div>
      <div className="flex flex-col h-full bg-blue-300 ">
        <div className="logout flex justify-center pt-6">
          <i
            className="fa fa-power-off text-black w-6 h-6 
            text-2xl cursor-pointer
            hover:opacity-50 "
            onClick={() => logout()}
          ></i>
        </div>
        <div className="menu  pt-6 flex-col flex-grow">
          {menuList?.map((menu) => {
            return (
              <div
                key={menu.link}
                className={
                  "py-3 px-6 flex items-center rounded-xl hover:bg-blue-500  border border-gray-500 m-2 " +
                  (location.pathname === menu.link
                    ? "bg-blue-500"
                    : "cursor-pointer")
                }
                onClick={() => {
                  history.push(menu.link);
                }}
              >
                <div className="mx-4 w-8 inline-block text-center">
                  <i className={menu.icon}></i>
                </div>
                <div
                  className={
                    "inline-block flex-shrink overflow-hidden whitespace-nowrap " +
                    (menuClosed ? "sideMenu-open" : "sideMenu-close")
                  }
                >
                  {menu.title}
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="arrow h-12 justify-center flex items-center cursor-pointer rounded-xl hover:bg-blue-500"
          onClick={() => {
            setMenuClosed(!menuClosed);
          }}
        >
          {menuClosed && <i className="fas fa-angle-double-left text-2xl"></i>}
          {!menuClosed && (
            <i className="fas fa-angle-double-right text-2xl"></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
