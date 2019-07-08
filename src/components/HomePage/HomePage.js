import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './HomePage.css';

// Material-UI
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

class HomePage extends Component {

  componentDidMount() {
    // fetch businesses for the new user
    this.props.dispatch({ type: 'FETCH_BUSINESSES', payload: this.props.user.id });
  }

  handleChangeInput = (event) => {

    // Payload is a single business object
    this.props.dispatch({type: 'SET_SINGLE_BUSINESS', payload: event.target.value});
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
        <div id="business-select-container">
          <div id="business-title">
            <h2>{this.props.singleBusiness.businessName && this.props.singleBusiness.businessName || `Add a business to get started!`}</h2>
          </div>
          <div id="select-business">
            {/* <form id="form-select-business"> */}
              {/* <FormControl> */}
                <InputLabel>Change Business</InputLabel>
                <Select
                  // value={this.props.singleBusiness.businessName}
                  value=""
                  onChange={(this.handleChangeInput)}
                  // onChange={() => handleChangeInput()}
                  autoWidth
                >
                  {this.props.business.length !== 0 &&
                    this.props.business.map(eachBusiness => {
                      return <MenuItem
                        key={eachBusiness.id}
                        value={eachBusiness}
                      >
                        {eachBusiness.businessName}
                      </MenuItem>
                    })}
                </Select>
              {/* </FormControl> */}
            {/* </form> */}
          </div>
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
  business: state.business.businessReducer,
  singleBusiness: state.business.singleBusiness,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(HomePage);
