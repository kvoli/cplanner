import { FILTER_CORE, FILTER_COURSE, FILTER_BREADTH, FILTER_ALL } from "../constants/selectors";
const initialState = { filter_core: false, filter_breadth: false, filter_course: false, filter_all: "" }

const filters = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_CORE:
      return {
        filter_core: !state.filter_core,
        filter_breadth: state.filter_breadth,
        filter_course: state.filter_course,
        filter_all: state.filter_all,
      }
    case FILTER_CORE:
      return {
        filter_core: !state.filter_core,
        filter_breadth: state.filter_breadth,
        filter_course: state.filter_course,
        filter_all: state.filter_all,
      }
    case FILTER_COURSE:
      return {
        filter_core: state.filter_core,
        filter_breadth: state.filter_breadth,
        filter_course: !state.filter_course,
        filter_all: state.filter_all,
      }
    case FILTER_BREADTH:
      return {
        filter_core: state.filter_core,
        filter_breadth: !state.filter_breadth,
        filter_course: state.filter_course,
        filter_all: state.filter_all,
      }
    case FILTER_ALL:
      return {
        filter_core: state.filter_core,
        filter_breadth: state.filter_breadth,
        filter_course: state.filter_course,
        filter_all: action.payload,
      }
    default:
      return state;
  }
}

export default filters;