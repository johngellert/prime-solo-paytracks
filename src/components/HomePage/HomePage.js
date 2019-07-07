import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.css';


class HomePage extends Component {


  render() {
    return (
    <div id="welcome-message">
      <h1 id="welcome">
        Welcome, {this.props.user.username}!
      </h1>
      <p>Your ID is: {this.props.user.id}</p>
      <LogOutButton className="log-in" />
    </div>
    )
  }
}
// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({user});
const mapStateToProps = state => ({
    user: state.user,
  });
  
  // this allows us to use <App /> in index.js
  export default connect(mapStateToProps)(HomePage);
