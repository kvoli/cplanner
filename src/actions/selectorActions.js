import { SELECT_MAJOR, SELECT_COURSE, CLEAR_SELECTION } from "../constants/selectors";

export const selectMajor = (major) => ({
  type: SELECT_MAJOR,
  payload: major,
})

export const selectCourse = (course) => ({
  type: SELECT_COURSE,
  payload: course,
})

export const clearSelection = () => ({
  type: CLEAR_SELECTION
})

