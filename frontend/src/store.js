import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import { noteCreateReducer, noteListReducer } from "./reducers/notesReducers";

// Import your reducers here
// For example:
// import exampleReducer from './exampleReducer';

const rootReducer = (state = {}, action) => {
    return{
    userLogin: userLoginReducer(state.userLogin, action),
    userRegister: userRegisterReducer(state.userRegister, action),
    noteList: noteListReducer(state.noteList, action),
    noteCreate: noteCreateReducer(state.noteCreate, action),
  // return {
  //   example: exampleReducer(state.example, action)
  };
};

const userInfoFormStorage = localStorage.getItem("userInfo")
?JSON.parse(localStorage.getItem("userInfo"))
:null;

const initialState = {
  userLogin: {userInfo: userInfoFormStorage},
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
