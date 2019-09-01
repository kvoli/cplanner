import { ADD_SUBJECT, REMOVE_SUBJECT, SELECT_SUBJECT } from "../constants/subjectSelector";

const test_subject = false


const initialState = {
  currentSubject: false,
  subjectList: [
    [test_subject, test_subject, test_subject, test_subject],
    [test_subject, test_subject, test_subject, test_subject],
    [test_subject, test_subject, test_subject, test_subject],
    [test_subject, test_subject, test_subject, test_subject],
    [test_subject, test_subject, test_subject, test_subject],
    [test_subject, test_subject, test_subject, test_subject]],
  selectedList: []
}

const subjectSelector = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SUBJECT:
      var newArray = state.subjectList.slice()
      newArray[action.payload.row][action.payload.col] = action.payload.subject
      return {
        subjectList: newArray,
        currentSubject: state.currentSubject,
        selectedList: [...state.selectedList, action.payload.subject]
      }
    case REMOVE_SUBJECT:
      return {
        subjectList: state.subjectList.map((row) => row.filter((subject) => subject.code !== action.payload.code)),
        currentSubject: state.currentSubject,
        selectedList: state.selectedList.filter(subject => subject !== action.payload.subject)
      }
    case SELECT_SUBJECT:
      return {
        subjectList: state.subjectList,
        currentSubject: action.payload,
        selectedList: state.selectedList,
      }
    default:
      return state
  }
}

export default subjectSelector;
