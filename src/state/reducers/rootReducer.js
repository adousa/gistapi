import { combineReducers } from "redux";
import gistReducer from "./gistReducer";

export default combineReducers({
  gistPublicData: gistReducer,
});
