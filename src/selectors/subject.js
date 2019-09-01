import { createSelector } from "reselect";

const getFilterAllSubjects = (state) => state.filters.filter_all
const getSubjects = (state) => state.subjects

export const getFilteredSubjects = createSelector(
  [getFilterAllSubjects, getSubjects],
  (filter_all, subjects) => subjects.filter(
    subject => (subject.name.toLowerCase().trim().includes(subjectFilter.toLowerCase().trim())
      || subject.code.toLowerCase().trim().includes(subjectFilter.toLowerCase().trim())
      || "^\\s*$".match(subjectFilter))
  )
)