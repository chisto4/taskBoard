import helloWindow from "../../pages/homePage/homePage";
import boardWindow from "../../pages/boardspace/BoardSpace";
import UserLogin from "../../pages/login/loginPage";
import UserRegistration from "../../pages/registration/registartionWindow";
import WorkSpace from "../../pages/workSpace/WorkSpace";
import { HELLO_PAGE, LOGIN, REGISTRATION, USER, WORK_SPACE, BOARD_WINDOW } from "../const/const";
import UserPage from "../../pages/userPage/userPage";
// const path = require('path');

export const authRoutes = [
 { 
    path: WORK_SPACE,
    Component: WorkSpace
},
 { 
    path: BOARD_WINDOW,
    Component: boardWindow
},
{
  path: USER,
  Component: UserPage
}
] //Странциы и информация доступная только авторизованным пользователям

export const publicRoutes = [
  {
    path: HELLO_PAGE,
    Component: helloWindow
  },
  {
    path: REGISTRATION,
    Component: UserRegistration
  },
  {
    path: LOGIN,
    Component: UserLogin
  }

] //Страницы и ифнормация дотспная публично без авторизации