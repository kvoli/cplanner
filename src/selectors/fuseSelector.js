import subjectList from "../assets/subjectList";


var options = {
  shouldSort: true,
  threshold: 0.1,
  location: 0,
  distance: 10,
  maxPatternLength: 10,
  minMatchCharLength: 4,
  keys: [
    "code",
    "name"
  ]
};
const fuse = new Fuse(list, options); // "list" is the item array

export const getFilteredSubjects = () => {



}