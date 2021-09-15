import UserLogin from "../../pages/login/loginPage";
import UserPage from "../../pages/UserPage/UserPage";
import WorkSpace from "../../pages/workSpace/WorkSpace";
import helloWindow from "../../pages/HomePage/HomePage";
import boardWindow from "../../pages/Boardspace/BoardSpace";
import UserRegistration from "../../pages/Registration/RegistartionWindow";
import {
  HELLO_PAGE, LOGIN, REGISTRATION, USER,
  WORK_SPACE, BOARD_WINDOW
} from "../const/const";

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
]

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
]