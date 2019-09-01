import { createSelector } from "reselect";
import Fuse from 'fuse.js'
import { subjectList } from "../assets/subjectList"

const options = {
  shouldSort: true,
  threshold: 0.08,
  location: 0,
  distance: 10,
  maxPatternLength: 10,
  minMatchCharLength: 4,
  keys: [
    "code",
    "name"
  ]
};

const fuse = new Fuse(subjectList, options); // "list" is the item array

const getFilterAllSubjects = (state) => state.filters.filter_all

export const getFilteredSubjects = createSelector(
  [getFilterAllSubjects],
  (filter_all) => (fuse.search(filter_all)
  )
)