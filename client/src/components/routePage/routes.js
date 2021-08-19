import helloWindow from "../pages/helloWindow/helloWindow";
import UserLogin from "../pages/login/loginPage";
import UserRegistration from "../pages/registration/registartionWindow";
import WorkSpace from "../pages/workSpace/WorkSpace";
import { HELLO_PAGE, LOGIN, REGISTRATION, WORK_SPACE } from "../const/consts";
const path = require('path');

export const authRoutes = [
 { 
    path: WORK_SPACE,
    Component: WorkSpace
},
{
  path: REGISTRATION,
  Component: UserRegistration
},
{
  path: LOGIN,
  Component: UserLogin
}
] //Странциы и информация доступная только авторизованным пользователям

export const publicRoutes = [
  {
    path: HELLO_PAGE,
    Component: helloWindow
  }

] //Страницы и ифнормация дотспная публично без авторизации