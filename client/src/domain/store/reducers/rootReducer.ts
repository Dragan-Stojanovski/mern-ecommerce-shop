import { combineReducers } from "redux";
import { authenticatedUser } from "./authenticatedUser";

export const rootReducer = combineReducers({
    user: authenticatedUser,
});
