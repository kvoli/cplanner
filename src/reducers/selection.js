import { SELECT_COURSE, SELECT_MAJOR, CLEAR_SELECTION, OPEN_SUBJECT } from "../constants/selectors";

const initialState = { course: false, major: false, subject: false, subjectModal: false };

function selection(state = initialState, action) {
  switch (action.type) {
    case SELECT_COURSE:
      return {
        major: state.major,
        course: action.payload,
        subject: state.subject,
        subjectModal: state.subjectModal,
      }
    case SELECT_MAJOR:
      return {
        major: action.payload,
        course: state.course,
        subject: state.subject,
        subjectModal: state.subjectModal,

      }
    case CLEAR_SELECTION:
      return {
        major: false,
        course: false,
        subject: false,
        subjectModal: false,

      }
    case OPEN_SUBJECT:
      return {
        major: state.major,
        course: state.course,
        subject: action.payload,
        subjectModal: !state.subjectModal
      }
  }
  return state;
};

export default selection;