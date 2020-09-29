import React, {useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import WorkIcon from '@material-ui/icons/Work';
import Home from './views/Home';
import Pricing from './views/Pricing';
import Users from './views/Users';
import Profile from './views/Profile';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import session from "./utils/Session"
import { ToastProvider } from "react-toast-notifications";
import Box from '@material-ui/core/Box';


import './custom.css';
import {
  useHistory, useLocation,
  withRouter,
  BrowserRouter as Router,
  Switch,
  loginRequest,
  Route,
  Link
} from "react-router-dom";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}FileBox{' '} {new Date().getFullYear()} {'.'}
    </Typography>
  );
}



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
  title: {
    flexGrow: 1,
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
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App(props) {
  const classes = useStyles()
  const theme = useTheme()
  const history = useHistory()
  const location = useLocation()
  const [open, setOpen] = React.useState(false)

  const userJSON = session.getSession("user");//isJsonString(session.getSession("user")) ? JSON.parse(session.getSession("user")) : {}
  const [user, setUser] = React.useState(userJSON)
  console.log(user)
  const [isLoged, setIsLoged] = React.useState(user.hasOwnProperty("login") ? true : false)



  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleSetLogin = ()=>{
    setIsLoged(true) 
  }
  const handleLogOut = () =>{
    setIsLoged(false)
    session.setSession("user", "{}")
    window.location.pathname = "/profile";
  }
  
  store.subscribe(() => {
    
    let state = store.getState();
    if(state.hasOwnProperty("DUser")){
      console.log(state.DUser)
      if(state.DUser.list.length == 1){
        handleSetLogin()
        session.setSession("user", state.DUser.list[0])
        setUser(state.DUser.list[0])
      }
    }
    /*
      if (store.getState().action.indexOf('counter') !== -1) {
          console.log('subscribed for messanger actions', store.getState());
      }
    */
  });
/*
  const getSession = ()=>{
    if(session.getSession("user").hasOwnProperty("login")){
      return session.getSession("user")
    }else{
      return false;
    }
  }
*/
  //checkSession()

  return (
    <Provider store={store}>
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap className={classes.title}>
                Облако файлов
              </Typography>
              {isLoged && (
                <Typography component="span">
                  <ListItem alignItems="flex-start" edge="start">
                    <ListItemAvatar>
                      <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={ user.name + " " + user.surname }
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                          </Typography>
                          <Typography
                            component="span"
                            style={{color: "white", fontSize:"14px"}}
                          >
                            Вы вошли
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <IconButton  onClick = {()=>{ handleLogOut(); }}  aria-label="display more actions" edge="end" color="inherit">
                      <ExitToAppIcon />
                    </IconButton>
                  </ListItem>
                </Typography>
              )}
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            
              <Divider />
              <List>
                <Link to={"/home"}>
                  <ListItem className={isLoged ? "" : classes.hide}>
                      <ListItemIcon>
                        <WorkIcon/>
                      </ListItemIcon>
                    <ListItemText primary={"Облако"} />
                  </ListItem>
                </Link>
                <Link to={"/pricings"}>
                  <ListItem>
                      <ListItemIcon>
                        <LocalGroceryStoreIcon/>
                      </ListItemIcon>
                    <ListItemText primary={"Тарифный план"} />
                  </ListItem>
                </Link>
              </List>
              <Divider />
              <List className={isLoged ? "" : classes.hide} >
                <Link to={"/users"}>
                  <ListItem >
                      <ListItemIcon>
                        <PeopleIcon/>
                      </ListItemIcon>
                    <ListItemText primary={"Пользователи"} />
                  </ListItem>
                </Link>
              </List>
              <List className={isLoged ? classes.hide : ""} >
                <Link to={"/profile"}>
                  <ListItem >
                      <ListItemIcon>
                        <AccountCircleIcon/>
                      </ListItemIcon>
                    <ListItemText primary={"Профиль"} />
                  </ListItem>
                </Link>
              </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
                <ToastProvider autoDismiss={true}>
                  <Switch>
                    <Route exact path="/">
                      <Profile/>
                    </Route>
                    <Route path="/Home">
                      <Home />
                    </Route>
                    <Route path="/pricings">
                      <Pricing />
                    </Route>
                    <Route path="/users">
                      <Users/>
                    </Route>
                    <Route path="/profile">
                      <Profile/>
                    </Route>
                  </Switch>
                </ToastProvider>
              
              <Box mt={8}>
                <Copyright />
              </Box>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;