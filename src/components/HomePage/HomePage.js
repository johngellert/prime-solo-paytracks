import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './HomePage.css';


class HomePage extends Component {

  componentDidMount () {
    // fetch businesses for the new user
    this.props.dispatch({type: 'FETCH_BUSINESSES', payload: this.props.user.id});
  }

  render() {
    return (
      <>
      <div id="welcome-container">
        <div id="welcome">
          <strong>Welcome, {this.props.user.username}! </strong>
        </div>
        <div id="your-id">
          Your ID is: {this.props.user.id} <></>
        </div>
        {/* <LogOutButton className="log-in" /> */}
      </div >

      <div>
        <h2>{this.props.singleBusiness.businessName && this.props.singleBusiness.businessName || `Add a business to get started!`}</h2>
      </div>
      <pre>
        {JSON.stringify(this.props, null, 2)}
      </pre>
      </>
    )
  }
}
// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({user});
const mapStateToProps = state => ({
  user: state.user,
  singleBusiness: state.business.singleBusiness,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(HomePage);
