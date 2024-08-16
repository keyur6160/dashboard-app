import { combineReducers } from "redux";
import widgetReducers from "./widgetReducers";

const reducers=combineReducers({
    widgets:widgetReducers,
});

export default reducers;