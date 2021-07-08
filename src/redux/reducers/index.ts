import { combineReducers } from "redux";
import OrderReducer from "./reducer";
// import NoteReducer from "./noteReducer";

const reducers = combineReducers({
    states: OrderReducer,
    // notes: NoteReducer,
}); 

export default reducers;
export type State = ReturnType<typeof reducers>