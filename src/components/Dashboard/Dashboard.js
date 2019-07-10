import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function Dashboard(props) {
  const { classes } = props;

  return (
    <div>
       <Grid container >
            <Paper className={classes.root} elevation={1}>
                <Typography variant="h5" component="h3">
                This is a sheet of paper.
                </Typography>
                <Typography component="p">
                Paper can be used to build surface or other elements for your application.
                </Typography>
            </Paper>
        </Grid> 
      
    </div>
  );
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(Dashboard));
