import { combineReducers } from "redux";
import selection from "./selection";
import courses from "./courses";
import subjects from "./subjects"
import filters from "./filters"

export default combineReducers({
  selection,
  courses,
  subjects,
  filters,
});
