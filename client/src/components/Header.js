import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return; // return nothing
      case false:
        return (
          <li className="nav-item">
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return (
          <li className="nav-item">
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }

  render() {
    console.log('this.props.auth', this.props.auth);
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <Link className="navbar-brand" to={this.props.auth ? '/surveys' : '/'}>
          Demo
        </Link>
        <ul className="navbar-nav ml-auto">{this.renderContent()}</ul>
      </nav>
    );
  }
}

// function mapStateToProps(state) {
//   return {auth: state.auth}
// } // refactored to below

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
