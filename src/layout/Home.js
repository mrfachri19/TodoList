import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../views/Dashboard"
import Activity from "../views/Activity";
import Login from "../views/auth/Login";

const Home = () => {
  const renderLoader = () => <p>Loading</p>;

  return (
    <>
      <Navbar />
      <div className="mx-56">
        <Suspense fallback={renderLoader()}>
          <Switch>
            <Route path="/home" exact component={Dashboard} />
            <Route
              path="/home/detailactivity/:id"
              exact
              component={Activity}
            />
            <Route
              path="/login"
              exact
              component={Login}
            />
            <Redirect from="/" to="/login" />
          </Switch>
        </Suspense>
      </div>
    </>
  );
};

export default Home;
