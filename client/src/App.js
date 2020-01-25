import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; // BrowswerRouter tells React Router how to behave. Route is used to set up rules
import { connect } from 'react-redux';
import * as actions from './actions';

import Header from './components/Header';
import Landing from './components/Landing';
const Dashbord = () => <h2>Dashbord</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
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
      </div>
    );
  }
}

export default connect(null, actions)(App); // first argument is mapState which is not needed here
