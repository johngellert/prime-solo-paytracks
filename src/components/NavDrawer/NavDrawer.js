import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home';
import People from '@material-ui/icons/People';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';

import "./NavDrawer.css";
import { inherits } from 'util';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

class NavDrawer extends Component {
    state = {
        open: false,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    // handleClickHome = () => {

    // };

    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    color="primary"
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, {
                                [classes.hide]: this.state.open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link className="home-nav-link" to="/home">
                            <Typography variant="h4" color="inherit" noWrap>
                                <strong>PayTracks</strong>
                            </Typography>
                        </Link>
                        {/* <Typography className={classes.welcome} color="inherit">Welcome, {this.props.user.username}! <strong>|</strong> </Typography> */}
                        {/* <Link>
                            <Typography color="inherit">Log Out</Typography>
                        </Link> */}
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                        paper: classNames({
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        }),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <Link className="nav-link" to="/home">
                            <ListItem button >
                                <ListItemIcon>{<Home />}</ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                        </Link>
                        <Link className="nav-link" to="/my/employees">
                            <ListItem button>
                                <ListItemIcon>{<People />}</ListItemIcon>
                                <ListItemText primary="Employees" />
                            </ListItem>
                        </Link>
                        <ListItem button onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>
                            <ListItemIcon>{<ExitToApp />}</ListItemIcon>
                            <ListItemText primary="Log Out" />
                        </ListItem>
                    </List>
                    {/* <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List> */}
                </Drawer>
                {/* <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Typography paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent
                        elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in
                        hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
                        velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing.
                        Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis
                        viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo.
                        Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus
                        at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
                        ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
                    </Typography>
                    <Typography paragraph>
                        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
                        facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
                        tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
                        consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus
                        sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in.
                        In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                        et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique
                        sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo
                        viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
                        ultrices sagittis orci a.
          </Typography>
                </main> */}
            </div>
        );
    }
}

NavDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
    business: state.business.businessReducer,
    singleBusiness: state.business.singleBusiness,
    employees: state.employees.employeesReducer,
    state,
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(NavDrawer));