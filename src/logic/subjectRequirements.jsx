import { useSelector, useDispatch } from 'react-redux';


const checkRequirements = {code, semester} => {
  const subject = useSelector(store => store.subjects[code])
  const selected = useSelector(store => store.subjectSelector)

  
}