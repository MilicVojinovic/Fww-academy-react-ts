import React, { useContext, useEffect, useReducer } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Loader from "./common/components/Loader";
import ProtectedRoute from "./common/components/ProtectedRoute";
import SideMenu from "./common/components/SideMenu";
import ContextProvider, { GlobalContext } from "./context/ContextProvider";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import TeacherHome from "./pages/teacher/TeacherHome";

export default function App() {
  return (
    <ContextProvider>
      <div className="h-screen w-screen flex">
        <Router>
          <SideMenu></SideMenu>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/teacher-home">
              <ProtectedRoute component={TeacherHome}></ProtectedRoute>
            </Route>
            <Route exact path="/*">
              <Redirect to="/login"></Redirect>
            </Route>
          </Switch>
        </Router>
      </div>
    </ContextProvider>
  );
}
