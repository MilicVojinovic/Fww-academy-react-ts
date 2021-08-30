import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./views/login/Login";

export default function App() {
    return <div className="h-screen w-screen">
        <Router>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
            </Switch>
        </Router>
    </div>;
}
