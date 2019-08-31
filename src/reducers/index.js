import { combineReducers } from "redux";
import selection from "./selection";
import courses from "./courses";
import subjects from "./subjects"

export default combineReducers({
  selection,
  courses,
  subjects,
});
