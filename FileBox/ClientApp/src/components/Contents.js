import React from 'react';
import MaterialTable from 'material-table';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { forwardRef } from 'react';
import { Paper } from "@material-ui/core";
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
import Divider from '@material-ui/core/Divider';
import DContents from './DContents';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

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
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};



export default function Files() {
  const classes = useStyles();
    //Rights table
    const tableDataRights = {
      columns: [
        { title: 'ID', field: 'id' },
        { title: 'Имя файла', field: 'name' },
        { title: 'Дата', field: 'date'},
        { title: 'Логин', field: 'login' },
        { title: 'Уровень', field: 'level' },
        
      ],
      data: [
          { id: 1, name: "Картинка.png", date: "05.02.2016", login: "masha", level: 1},
          { id: 2, name: "Док.doc", date: "05.02.2016", login: "mylog", level: 2}
      ],
  }
  const [stateTableRights, setStateTableRight] = React.useState(tableDataRights);
  
  return (
    <React.Fragment>
      <Title>Файлы и папки</Title>
      <DContents/>
      {/* */}
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
                                    setStateTableRight((prevState) => {
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
                                      setStateTableRight((prevState) => {
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
                                    setStateTableRight((prevState) => {
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
    </React.Fragment>
  );
}
