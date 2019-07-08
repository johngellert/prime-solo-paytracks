import React, { Component } from 'react';
import { connect } from 'react-redux';


class EmployeesPage extends Component {


  render() {
    return (
    <div id="employees-page">
        <h1>Employees Page</h1>
      

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
  export default connect(mapStateToProps)(EmployeesPage);
