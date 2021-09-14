export interface IinitState {
  user: {};
}

export enum ActionTypesAuth {
  USER = "user",
}

export type ActionAuth = { type: ActionTypesAuth.USER; payload: any };
