import { useSelector, useDispatch } from 'react-redux';


const checkRequirements = () => {
  const subjectList = useSelector(store => store.subjectSelector.selectedList)
  
  const selected = useSelector(store => store.subjectSelector.currentSubject)

  

  var prereqs = selected.prerequisites.filter(req => req !== subjectList)
  var coreqs = selected.corequisites
  var anti = selected.antirequisites

  

  










}