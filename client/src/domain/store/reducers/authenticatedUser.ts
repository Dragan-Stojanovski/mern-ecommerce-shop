// import { UserActionTypes } from "../actions/getUserOwn";

import { UserActionTypes } from "../actions/getUserOwn";

const initialState = null;
export const authenticatedUser = (
  state = initialState,
  action:UserActionTypes
) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    case "CLEAR_USER":
      return null;
    default:
      return state;
  }
};
