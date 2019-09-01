import { ADD_SUBJECT, REMOVE_SUBJECT, SELECT_SUBJECT } from "../constants/subjectSelector";

const test_subject = { "year": "2019", "level": "Undergraduate Level 1", "code": "COMP10002", "campus": "Parkville", "availability": "Semester 1, Semester 2", "prerequisites": ["COMP10001", "COMP10003"], "corequisites": "None", "antirequisites": ["COMP20005"], "name": "Foundations of Algorithms", "desc": "AIMS\nIn many projects, it is important for programmers to have fine control over low-level details of program execution, and to be able to assess the cost of a design decision on likely overall program performance. This subject introduces students to a system programming language that gives prog..." }


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
