import helloWindow from "../pages/helloWindow/helloWindow";
import UserRegistration from "../pages/registrationWindow/registartionWindow";
import WorkSpace from "../pages/workSpace/WorkSpace";
import { HELLO_PAGE, REGISTRATION, WORK_SPACE } from "../utils/consts";
const path = require('path');

export const authRoutes = [
 { 
    path: WORK_SPACE,
    Component: WorkSpace
},
{
  path: REGISTRATION,
  Component: UserRegistration
}
] //Странциы и информация доступная только авторизованным пользователям

export const publicRoutes = [
  {
    path: HELLO_PAGE,
    Component: helloWindow
  }

] //Страницы и ифнормация дотспная публично без авторизации