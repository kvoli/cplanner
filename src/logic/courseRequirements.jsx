import { useSelector, useDispatch } from 'react-redux';


export const getBreadths = () => {
  const { course, major, subject, subjectModal } = useSelector(store => store.selection)
  const subjects = useSelector(store => store.subjects)
  const courses = useSelector(store => store.courses)
}

export const getMajor = () => {
  const { course, major, subject, subjectModal } = useSelector(store => store.selection)
  const subjects = useSelector(store => store.subjects)
  const courses = useSelector(store => store.courses)
}

export const getCourse = () => {
  const subjects = useSelector(store => store.subjects)
  const { course, major, subject, subjectModal } = useSelector(store => store.selection)

  return (
    
  )


}















    }