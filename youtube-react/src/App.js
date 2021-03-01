import "./App.css";
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import RecommendVideos from "./RecommendVideos";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchPage from "./SearchPage.js"

function App() {
  return (
    <div className="App">
      <Router>
            <Header/>
        <Switch>
          <Route path="/search/:searchTerm">
          <div className="app_page">
              <Sidebar />
              <SearchPage/>
            </div>
          </Route>
          <Route path="/">
          
            <div className="app_page">
              <Sidebar />
              <RecommendVideos />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
