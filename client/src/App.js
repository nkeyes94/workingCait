import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login.js";
import Home from "./pages/Home.js";
import SignUp from "./pages/SignUp.js";
import Dashboard from "./pages/Dashboard";

//Blank Pages
import Registration from "./pages/Registration.js";
import SignIn from "./pages/SignIn.js";
import FaceRecognition from "./pages/FaceRecognition.js";
import TodoPage from "./pages/TodoPage.js";


// import { Helmet } from 'react-helmet';
// import component using helmet
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
       
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          {/* Routes to Blank Pages */}
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/facerecognition" component={FaceRecognition} />
          <Route exact path="/todopage" component={TodoPage} />

        </Switch>
   
      </div>
    </Router>
  );
}

export default App;

