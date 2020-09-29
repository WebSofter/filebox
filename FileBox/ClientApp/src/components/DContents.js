import React, { useState, useEffect, forwardRef } from "react";
import { connect } from "react-redux";

import * as actionsFolder from "../actions/DFolder";
import * as actionsFile from "../actions/DFile";
import * as actionsContent from "../actions/DContent";

import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button, Divider } from "@material-ui/core";
import DContentForm from "./DContentForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import clsx from 'clsx';

import MaterialTable from 'material-table';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Title from './Title';
import Tools from './Tools';
import Chart from './Chart';
import Deposits from './Deposits';
import session from "../utils/Session"
import Folder from '@material-ui/icons/Folder';
import Typography from '@material-ui/core/Typography';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import FolderIcon from '@material-ui/icons/Folder';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InfoIcon from '@material-ui/icons/Info';
import VisibilityIcon from '@material-ui/icons/Visibility';
const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },
    fixedHeight: {
        height: 240,
      },
})


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    AccountCircle: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    Folder: forwardRef((props, ref) => <Folder {...props} ref={ref} />)
  };

  const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
        seeMore: {
            marginTop: theme.spacing(3),
            depositContext: {
            flex: 1,
        },
            appBarSpacer: theme.mixins.toolbar,
            content: {
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        },
        container: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        paper: {
            padding: theme.spacing(1),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
        },
        fixedHeight: {
            height: 250,
        },
    },
  }));

const DContents = ({ classes, ...props }) => {

    useEffect(()=>{
        //props.fetchAllDFolders();
    })
    const { addToast } = useToasts()
    const [user, setUser] = React.useState(session.getSession('user'))
    classes.fixedHeightPaper = clsx(classes.paper, classes.fixedHeight); 


    const [selectRow, setSelectRow] = useState();//[{ type: "folder", id: 2}, { type: "file", id: 1}]
    const [open, setOpen] = React.useState(false);
    const [activeRow, setActiveRow]  = React.useState({});
    const [countContent, setCountContent] = React.useState({files:0, folders:0})

    const handleClickOpen = () => {

        setOpen(true);
    };
    const handleClose = () => {

        setOpen(false)
    };
    const handleApply = () => {

        setOpen(false)
    }


    //Rights table
    const tableDataRights = {
        columns: [
          { title: 'ID', field: 'id' },
          { title: 'Имя файла', field: 'name' },
          { title: 'Дата', field: 'date'},
          { title: 'Логин', field: 'login' },
          { title: 'Уровень', field: 'level', lookup: { 1: 'Полный', 2: 'Просмотр', 3: 'Закрытый' } },
          
        ],
        data: [
            { id: 1, name: "Картинка.png", date: "05.02.2016", login: "masha", level: 1},
            { id: 2, name: "Док.doc", date: "05.02.2016", login: "mylog", level: 2}
        ],
    }
    const [stateTableRights, setStateTableRight] = React.useState(tableDataRights);
    //Content table
    //
    useEffect(() => {
        props.fetchAllDContents(user.id, tableInit, onSuccess);
        //
        props.countDContent(user.id, (response)=>{
            setCountContent(response.data)
            console.log(countContent)
        })
    }, []);

    //rowData.ext = "dir" ? (<FolderIcon/>) : (<InsertDriveFileIcon/>)
    const tableDataContent = {
        columns: [
          { title: '', field: "type", render: rowData=>(<div>{rowData.idType == 1? (<FolderIcon fontSize="large" style={{ color: "#c8a415" }}/>) : (<InsertDriveFileIcon fontSize="large" style={{ color: "#40c4ff" }}/>)}</div>), actionsColumnIndex:0},
          { title: 'ID', field: 'id', editable: "never", hidden: true },
          { title: 'Владелец', field: 'idUser',  initialEditValue: user.id, type: 'numeric', hidden: true },
          { title: 'Имя', field: 'name' },
          { title: 'Доступ', field: 'idAccess', initialEditValue: 2, lookup: { 1: 'Полный', 2: 'Просмотр', 3: 'Закрытый' }, type: 'numeric'},
          { title: 'Тип', field: 'idType', editable: "never", initialEditValue: 1, lookup: { 1: 'Папка', 2: 'Файл'}, type: 'numeric'},
          { title: 'Дата', field: 'date', editable: "never", editable: "never", initialEditValue: (new Date().toISOString().slice(0, 19).replace('T', ' '))}
        ],
        data: props.DContentList//[...props.DFolderList, ...props.DFileList],
    }

    const [state, setState] = React.useState(tableDataContent);

    const onSuccess = () => {
        addToast("отправлено удачно", { appearance: 'success' })
    }
    
    const contentAction = (data)=>{
        if(data.action === 'upload'){
            const formData = new FormData();
            formData.append('file', data.data)
            if(activeRow.hasOwnProperty("selectedRow"))
            {
                const folder =  activeRow.selectedRow
                formData.append('idAccess', folder.idAccess)
                formData.append('idUser', folder.idUser)
                formData.append('idParent', folder.idParent)
            }
            formData.append('idAccess', 1)
            formData.append('idUser', user.id)
            formData.append('idParent', 0)
            formData.append('idType', 2)
            props.uploadDContent(formData, onSuccess)
            //
            setTimeout(()=>{
                props.fetchAllDContents(user.id, tableInit, onSuccess);
                //
                props.countDContent(user.id, (response)=>{
                    setCountContent(response.data)
                    console.log(countContent)
                })
            }, 1000)
        }
        //
        if(data.action === 'delete'){
            /////////////
            let deletable = [];
            const folder =  activeRow.selectedRow
            if(selectRow!==undefined && Array.isArray(selectRow)){
                deletable = selectRow
            }else{
                deletable = [activeRow.selectedRow]
            }
            const ids = deletable.map(a => a.id);
            /////////////
            props.deleteAllDContents(ids)
            //
            setTimeout(()=>{
                props.fetchAllDContents(user.id, tableInit, onSuccess);
                //
                props.countDContent(user.id, (response)=>{
                    setCountContent(response.data)
                    console.log(countContent)
                })
            }, 1000)
        }
        
        //
        if(data.action === 'download'){
            /////////////
            let downloadable = [];
            const folder =  activeRow.selectedRow
            if(selectRow!==undefined && Array.isArray(selectRow)){
                downloadable = selectRow
            }else{
                downloadable = [activeRow.selectedRow]
            }
            const ids = downloadable.map(a => a.id);
            /////////////
            const archiveName = "archive_" + getDateTime()+".zip"
            
            let queryIds = "";
            ids.forEach((element, i) => {
                queryIds +="ids=" + element + "&"
            });
            //window.location = 'http://localhost:5000/api/contents/download/archive_2020_5_26_5_9_45.zip?ids=' + JSON.stringify(ids);

            console.log(ids, queryIds, archiveName)
            props.downloadDContent(queryIds, archiveName)
        }
        //
        if(data.action == "access"){
            handleClickOpen()
        }
    }
    
    const getDateTime = ()=>{
        /*
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return dateTime = date+' '+time;
        */
       var today = new Date();
       var date = today.getFullYear()+'_'+(today.getMonth()+1)+'_'+today.getDate();
       var time = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
       return date+'_'+time;
    }
    const tableInit = (response)=>{
        //console.log(response)
        tableDataContent.data = response.data;//props.DContentList;
        setState(tableDataContent)
    }
    const removeDuplicates = (array, key) => {
        return array.reduce((arr, item) => {
          const removed = arr.filter(i => i[key] !== item[key]);
          return [...removed, item];
        }, []);
    }
    return (
    <Grid container spacing={1}>
        <Dialog fullScreen open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Настройка общего доступа
                </Typography>
                <Button autoFocus color="inherit" onClick={handleApply}>
                    Подтвердить
                </Button>
            </Toolbar>
            </AppBar>
            <DialogTitle id="form-dialog-title">Настройка общего доступа</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Укажите логины для выбранных файлов и папок для открытия к ним доступа другим участникам облака
            </DialogContentText>

            <Grid item xs={12} md={12} lg={12}>
                <Paper className={classes.paper} elevation={3}>
                    <MaterialTable
                            icons={tableIcons}
                            title="Пользователи с доступом"
                            columns={stateTableRights.columns}
                            data={stateTableRights.data}
                            editable={{
                            onRowAdd: (newData) =>
                                new Promise((resolve) => {

                                setTimeout(() => {
                                    resolve();
                                    setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.push(newData);
                                    return { ...prevState, data };
                                    });
                                }, 600);

                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                    setState((prevState) => {
                                        const data = [...prevState.data];
                                        data[data.indexOf(oldData)] = newData;
                                        return { ...prevState, data };
                                    });
                                    }
                                }, 600);
                                }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    return { ...prevState, data };
                                    });
                                }, 600);
                                }),
                            }}
                            detailPanel={[
                                {
                                    tooltip: 'Содержимое',
                                    render: rowData => {
                                    return (
                                        <div
                                        style={{
                                            fontSize: 100,
                                            textAlign: 'center',
                                            color: 'white',
                                            backgroundColor: '#b6b8c3',
                                        }}
                                        >
                                        {rowData.id}
                                        </div>
                                    )
                                    },
                                }
                            ]}
                        />
                </Paper>
            </Grid>


            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Отмена
            </Button>
            <Button onClick={handleApply} color="primary">
                Подтвердить
            </Button>
            </DialogActions>
        </Dialog>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={classes.fixedHeightPaper}>
            <Chart/>
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={6} md={4} lg={3}>
          <Paper className={classes.fixedHeightPaper}>
            <Deposits/>
          </Paper>
        </Grid>
        {/* Recent Files */}
        <Grid item xs={12} md={8} lg={9}>
            <Paper className={classes.paper} elevation={3}>
                <MaterialTable
                        icons={tableIcons}
                        parentChildData={(row, rows) => rows.find(a => a.id === row.idParent)}
                        title="Последние файлы"
                        columns={state.columns}
                        data={state.data}
                        editable={{
                        onRowAdd: (newData) =>
                            new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                delete newData["date"]
                                
                                //Add
                                props.createDContent(newData, onSuccess)

                                return { ...prevState, data }
                                });
                            }, 600);
                        }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;

                                    //Update
                                    props.updateDContent(newData.id, newData, onSuccess)

                                    return { ...prevState, data };
                                });
                                }
                            }, 600);
                            }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);

                                //Delete
                                props.deleteDContent(oldData.id, onSuccess)

                                return { ...prevState, data };
                                });
                            }, 600);
                            }),
                        }}
                        options={{
                            selection: true,
                            actionsColumnIndex: -1,
                            rowStyle: rowData => ({
                                backgroundColor: (activeRow !=={} && activeRow.hasOwnProperty("selectedRow") && activeRow.selectedRow.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
                            }),
                            pageSize: 10
                        }}
                        onRowClick={((evt, selectedRow) => {
                            
                            if(activeRow !==null && activeRow.hasOwnProperty("selectedRow") && activeRow.selectedRow.id === selectedRow.id){
                                setActiveRow({})
                            }
                            else {
                                //selectedRow = removeDuplicates(selectedRow, 'id')
                                setActiveRow({selectedRow})
                            }
                        })}
                        onSelectionChange={rowData => {
                            rowData = removeDuplicates(rowData, 'id')
                            setSelectRow(rowData)
                            //this.toggle.bind(this, data.id);
                        }}
                        
                        actions={[
                            {
                              icon: ()=><AddBox/>,
                              tooltip: 'Создать папку',
                              onClick: (event, rowData) => {

                              }
                            }
                        ]}
                        
                        detailPanel={[
                            {
                                icon: ()=><InfoIcon color="primary"/>,
                                openIcon: ()=><InfoIcon/>,
                                tooltip: 'Информация',
                                render: rowData => {
                                  return (
                                    <div
                                      style={{
                                        fontSize: 100,
                                        textAlign: 'center',
                                        color: 'white',
                                        backgroundColor: '#FDD835',
                                      }}
                                    >
                                      {rowData.name} {rowData.surname}
                                    </div>
                                  )
                                },
                            },
                            {
                                icon: ()=><VisibilityIcon color="primary"/>,
                                openIcon: ()=><VisibilityIcon/>,
                                tooltip: 'Открыть файл',
                                render: rowData => {
                                  return (
                                    <div
                                      style={{
                                        fontSize: 100,
                                        textAlign: 'center',
                                        color: 'white',
                                        backgroundColor: '#FDD835',
                                      }}
                                    >
                                      {rowData.name} {rowData.surname}
                                    </div>
                                  )
                                },
                              },
                        ]}
                    />
            </Paper>
        </Grid>
        {/* Tools */}
        <Grid item xs={6} md={4} lg={3}>
          <Paper className={classes.fixedHeightPaper}>
            <Tools selectRow={selectRow} activeRow={activeRow} contentAction={contentAction}/>
          </Paper>
        </Grid>
      </Grid>
    );
}

/*
const mapStateToProps = state => ({
    DFolderList: state.DFolder.list,
    //DFileList: state.DFile.list,
})

const mapActionToProps = {
    fetchAllDFolders: actionsFolder.fetchAll,
    deleteDFolder: actionsFolder.Delete,
    createDFolder: actionsFolder.create,
    updateDFolder: actionsFolder.update,

    //fetchAllDFiles: actionsFile.fetchAll,
}
*/
const mapStateToProps = state => ({
    DContentList: state.DContent.list,
    //DFileList: state.DFile.list,
})

const mapActionToProps = {
    fetchAllDContents: actionsContent.fetchAll,
    deleteDContent: actionsContent.Delete,
    deleteAllDContents: actionsContent.deleteAll,
    createDContent: actionsContent.create,
    updateDContent: actionsContent.update,
    uploadDContent: actionsContent.uploadFile,
    countDContent: actionsContent.count,
    downloadDContent: actionsContent.download,
    //fetchAllDFiles: actionsFile.fetchAll,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DContents));