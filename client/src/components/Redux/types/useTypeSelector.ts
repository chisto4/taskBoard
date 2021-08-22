import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../reducer";

//Create a hook for work
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector