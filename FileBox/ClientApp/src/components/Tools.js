import React from 'react';
import clsx from 'clsx';
import axios, { post } from 'axios';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Deposits from '../components/Deposits';
import Chart from '../components/Chart';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import Contents from '../components/Contents';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
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
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
});

/*****************Загрузка файла */






class Tools extends React.Component {
    constructor(props) {
        super(props);
        this.state ={ file:null }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onFormChange = this.onFormChange.bind(this)
        //this.fileUpload = this.fileUpload.bind(this)
        this.actionDisabled = {upload: true, delete: true, download: false, access: true}
      }
      /*
      componentDidUpdate(props){
        console.log("componentDidUpdate", props)
      }
      componentDidMount(props){
        console.log("componentDidMount", props)
      }
      */
      componentWillReceiveProps(props){
        //Upload operation 
        if(props.selectRow===undefined || Array.isArray(props.selectRow) && props.selectRow.length ==0 || props.selectRow!==undefined && Array.isArray(props.selectRow) && props.selectRow.length == 1 && props.selectRow[0].idType == 1 ){
          this.actionDisabled = {...this.actionDisabled, ...{upload:false}};
        }else{
          this.actionDisabled = {...this.actionDisabled, ...{upload:true}};
        }

        if(props.selectRow!==undefined && !Array.isArray(props.selectRow) || Array.isArray(props.selectRow) && props.selectRow.length > 0){
          this.actionDisabled = {...this.actionDisabled, ...{delete:false}};
        }else{
          this.actionDisabled = {...this.actionDisabled, ...{delete:true}};
        }
        console.log("############", props.selectRow)
        if(props.selectRow!==undefined && !Array.isArray(props.selectRow) || Array.isArray(props.selectRow) && props.selectRow.length > 0){
          this.actionDisabled = {...this.actionDisabled, ...{download:false}};
        }else{
          this.actionDisabled = {...this.actionDisabled, ...{download:true}};
        }

        if(props.selectRow!==undefined && Array.isArray(props.selectRow) && props.selectRow.length !== 0 && props.selectRow.length === 1){
          this.actionDisabled = {...this.actionDisabled, ...{access:false}};
        }else{
          this.actionDisabled = {...this.actionDisabled, ...{access:true}};
        }
      }
      
      onFormSubmit(e){
        e.preventDefault() // Stop form submit
        this.props.contentAction({action: "upload", data: e.target.files[0]});
      }
      
      onFormChange(e){
        this.setState({file:e.target.files[0]})
        this.onFormSubmit(e)
      }

  render(){
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);  
    return <div >
            <MenuList>
              <MenuItem>
                <form style={{width:"100%"}}> {/**onSubmit={this.onFormSubmit} */}
                    {/*
                    <input type="file" onChange={this.onChange} />
                    <button type="submit">
                        <ListItemIcon>
                        <AddCircleIcon fontSize="small"/>
                        
                        </ListItemIcon>
                        <Typography variant="inherit">Загрузить</Typography>
                    </button>
                    */}
                    <Button fullWidth={true} color="primary" variant="contained" component="label" disabled={ this.actionDisabled.upload }> 
                      <AddCircleIcon fontSize="small"/> Загрузить
                      <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e)=>{this.onFormChange(e)}}
                      />
                    </Button>

                </form>
              </MenuItem>
              <MenuItem>
                <Button onClick={(e)=>{this.props.contentAction({action: "delete", data: null})}} disabled={ this.actionDisabled.delete } fullWidth={true} color="primary" variant="contained" component="label"><DeleteIcon fontSize="small" /> Удалить </Button>
              </MenuItem>
              <MenuItem>
                <Button onClick={(e)=>{this.props.contentAction({action: "download", data: null})}} disabled={ this.actionDisabled.download } fullWidth={true} color="primary" variant="contained" component="label"><CloudDownloadIcon fontSize="small" /> Скачать </Button>
              </MenuItem>
              <MenuItem>
                <Button onClick={(e)=>{this.props.contentAction({action: "access", data: null})}} disabled={ this.actionDisabled.access } fullWidth={true} color="primary" variant="contained" component="label"><AccessibilityIcon fontSize="small" /> Доступ </Button>
              </MenuItem>
            </MenuList></div>;
  }
}

Tools.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  DContentList: state.DContent.list,
  //DFileList: state.DFile.list,
})

export default withStyles(styles)(Tools);