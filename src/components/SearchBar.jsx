import React from "react";
import TextField from "@material-ui/core/TextField";
import { filterCoreSubjects, filterCourseSubjects, filterBreadthSubjects, filterAllSubjects } from "../actions/selectorActions";
import { useSelector, useDispatch } from 'react-redux';


const SearchBar = () => {

  const dispatch = useDispatch();
  const { filter_core, filter_breadth, filter_course, filter_all } = useSelector(store => store.filters)


  function handleChange(event) {
    dispatch(filterAllSubjects(event.target.value))
  }

  return (
    <TextField
      id="standard-textarea"
      label="Filter"
      placeholder="filter subjects"
      margin="normal"
      onChange={handleChange}
      value={filter_all}
    />
  )
}

export default SearchBar;
