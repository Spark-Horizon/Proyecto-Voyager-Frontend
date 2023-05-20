import { StudentInterface } from '../components/interfaceStudent/StudentInterface'
import { TeacherInterface } from '../components/interfaceTeacher/TeacherInterface'
import { AdminInterface } from '../components/interfaceAdmin/AdminInterface'

import '../styles/studentPage.css'

export const HomePage = ({user}) => {

  switch(user.role){
    case 'student':
      return (
        <StudentInterface user={user}/>
      )
    case 'teacher':
      return (
        <TeacherInterface user={user}/>
      )
    case 'admin':
      return(
        <AdminInterface user={user}/>
      )
    default:
      return(<p>Technical issuessss</p>)
  }
}
