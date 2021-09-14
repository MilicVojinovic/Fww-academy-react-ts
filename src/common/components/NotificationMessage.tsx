import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../../context/ContextProvider";
import { ActionTypesCommon } from "../../types/common.types";
import { ERROR_CODES, SUCCESS_CODES } from "../../constants/messages";

function NotificationMessage({}) {
  const { stateAuth, dispatchAuth, stateCommon, dispatchCommon } =
    useContext(GlobalContext);

  const refNotifMessage = useRef<HTMLDivElement>(null);

  function messageColor(message: string) {
    if (!!message) {
      return "bg-green-400";
    } else {
      return "bg-red-400";
    }
  }

  const messageText = () => {
    if (
      stateCommon.notificationMessage.status.status &&
      stateCommon.notificationMessage.status.status === 200
    ) {
      if (!stateCommon.notificationMessage.message) {
        return "Uspešno!";
      }
      let succesKey: keyof typeof SUCCESS_CODES =
        stateCommon.notificationMessage.message;
      return SUCCESS_CODES[succesKey];
    }

    if (
      stateCommon.notificationMessage.status &&
      stateCommon.notificationMessage.status.response &&
      stateCommon.notificationMessage.status.response.data
    ) {
      let errorKey: keyof typeof ERROR_CODES =
        stateCommon.notificationMessage.status.response.data.errors;
      return ERROR_CODES[errorKey];
    } else {
      return "Nešto nije u redu!";
    }
  };

  useEffect(() => {
    let count = 0;
    if (refNotifMessage && refNotifMessage.current) {
      refNotifMessage.current.addEventListener("animationend", () => {
        count++;
        if (count === 3) {
          dispatchCommon({
            payload: { status: false, message: "" },
            type: ActionTypesCommon.NOTIFICATION_MESSAGE,
          });
        }
      });
    }

    return () => {
      if (refNotifMessage && refNotifMessage.current) {
        refNotifMessage.current.removeEventListener("animationend", () => {});
      }
    };
  }, []);

  return (
    <div className="messages w-full h-full absolute left-0 top-0 z-10 bg-opacity-75 overflow-hidden">
      <div className="relative h-full w-full">
        <div
          ref={refNotifMessage}
          className={
            "rounded-md message relative flex items-center justify-center " +
            messageColor(stateCommon.notificationMessage.message)
          }
        >
          <span className="text-white">{messageText()}</span>
        </div>
      </div>
    </div>
  );
}

export default NotificationMessage;
