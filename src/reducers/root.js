import { SELECT_COURSE, SELECT_MAJOR, CLEAR_SELECTION } from "../constants/selectors";

const initialState = { course: false, major: false };

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_COURSE:
      return {
        major: state.major,
        course: action.payload
      }
    case SELECT_MAJOR:
      return {
        major: action.payload,
        course: state.course
      }
    case CLEAR_SELECTION:
      return {
        major: false,
        course: false
      }
  }
  return state;
};

export default rootReducer;