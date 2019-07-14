import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        height: 300,
    },
    // control: {
    //     padding: theme.spacing.unit * 2,
    // },
  });

function Dashboard(props) {
  const { classes } = props;

  return (
    <div>
       <Grid container className={classes.root} spacing={6}>
            <Grid item xs={6}>
                <Paper className={classes.paper} elevation={1}>
                    <Typography variant="h5" component="h3">
                    Year-To-Date Withholdings
                    </Typography>
                    <Typography component="p">
                    Federal:
                    </Typography>
                    <Typography component="p">
                    State:
                    </Typography>
                    <Typography component="p">
                    Social Security and Medicare:
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper} elevation={1}>
                    <Typography variant="h5" component="h3">
                    Year-To-Date Cost of Service
                    </Typography>
                    <Typography component="p">
                    Wages Paid:
                    </Typography>
                    <Typography component="p">
                    Social Security and Medicare:
                    </Typography>
                    <Typography component="p">
                    Minnesota Unemployment Insurance:
                    </Typography>
                    <Typography component="p">
                    Workers Compensation Insurance:
                    </Typography>
                </Paper>
            </Grid>
        </Grid> 
        <pre>
            {JSON.stringify(props, null, 2)}
        </pre>
      
    </div>
  );
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(Dashboard));
