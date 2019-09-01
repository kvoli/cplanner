import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { openSubject } from "../actions/subjectSelector";
import { useSelector, useDispatch } from 'react-redux';
import Subject from "./Subject";


const SubjectModal = () => {

  const dispatch = useDispatch();
  const { subject, subjectModal, course, major} = useSelector(store => store.selection)

  return (
    <Dialog
      open={subjectModal}
      onClose={() => dispatch(openSubject(false))}
      aria-labelledby="scroll-dialog-title"
      transitionDuration= {250}
    >
      <Subject props={subject} />
    </Dialog>
  );
}

export default SubjectModal;