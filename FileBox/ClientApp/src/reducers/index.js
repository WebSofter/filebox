import { combineReducers } from "redux";
import { DUser } from "./DUser";
import { DFolder } from "./DFolder";
import { DFile } from "./DFile";
import { DPricing } from "./DPricing";
import { DContent } from "./DContent";
export const reducers = combineReducers({
    DUser,
    DFolder,
    DFile,
    DPricing,
    DContent
})