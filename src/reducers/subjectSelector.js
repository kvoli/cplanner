import { ADD_SUBJECT, REMOVE_SUBJECT } from "../constants/subjectSelector";

const initialState = subjectDict

const initialState = {
  semester_1: [false, false, false, false],
  semester_2: [false, false, false, false],
  semester_3: [false, false, false, false],
  semester_4: [false, false, false, false],
  semester_5: [false, false, false, false],
  semester_6: [false, false, false, false],
}

const selectedSubjects = (state = initialState, action) => {
  switch (action.type) {
    ADD_SUBJECT:
  return {
    action.payload;
  }
  REMOVE_SUBJECT:
  return {
    action.payload;
  }
    default:
return state
  }
}

export default selectedSubjects;