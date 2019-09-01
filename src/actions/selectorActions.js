import { SELECT_MAJOR, SELECT_COURSE, CLEAR_SELECTION, FILTER_CORE, FILTER_COURSE, FILTER_BREADTH, FILTER_ALL } from "../constants/selectors";

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

export const filterCoreSubjects = (payload) => ({
  type: FILTER_CORE,
  payload: payload
})

export const filterCourseSubjects = (payload) => ({
  type: FILTER_COURSE,
  payload: payload
})

export const filterBreadthSubjects = (payload) => ({
  type: FILTER_BREADTH,
  payload: payload
})

export const filterAllSubjects = (payload) => ({
  type: FILTER_ALL,
  payload: payload
})

