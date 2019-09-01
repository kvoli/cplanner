import { ADD_SUBJECT, REMOVE_SUBJECT, OPEN_SUBJECT, SELECT_SUBJECT } from "../constants/subjectSelector";

export const addSubject = (payload) => ({
  type: ADD_SUBJECT,
  payload: payload
})

export const removeSubject = (payload) => ({
  type: REMOVE_SUBJECT,
  payload: payload
})

export const openSubject = (payload) => ({
  type: OPEN_SUBJECT,
  payload: payload
})

export const selectSubject = (payload) => ({
  type: OPEN_SUBJECT,
  payload: payload
})



