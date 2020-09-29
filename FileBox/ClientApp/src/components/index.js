import { combineReducers } from "redux";
import { DUser } from "./DUser";
import { DFolder } from "./DFolder";
import { DFile } from "./DFile";

export const reducers = combineReducers({
    DUser,
    DFolder,
    DFile
})