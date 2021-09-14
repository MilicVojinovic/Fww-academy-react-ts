export interface IinitState {
  loader: boolean;
  notificationMessage: {
    status: any;
    message: string;
  };
}

export enum ActionTypesCommon {
  LOADER = "loader",
  NOTIFICATION_MESSAGE = "notificationMessage",
}

export type ActionCommon =
  | { type: ActionTypesCommon.LOADER; payload: boolean }
  | {
      type: ActionTypesCommon.NOTIFICATION_MESSAGE;
      payload: {
        status: any;
        message: string;
      };
    };
