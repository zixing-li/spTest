import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; // BrowswerRouter tells React Router how to behave. Route is used to set up rules

import Header from './components/Header';
const Dashbord = () => <h2>Dashbord</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Header /> {/*always visible*/}
          <Route exact={true} path="/" component={Landing} />
          <Route exact={true} path="/surveys" component={Dashbord} />
          <Route path="/surveys/new" component={SurveyNew} />
        </div>
      </BrowserRouter>
      <a href="/auth/google">Sign In</a>
    </div>
  );
}

export default App;
