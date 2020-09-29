import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/DUser";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button, Divider } from "@material-ui/core";
import DUserForm from "./DUserForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";



const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const DUsers = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllDUsers()
    }, [])//componentDidMount
    
    //toast msg.
    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Вы действительно хотите удалить?'))
            props.deleteDUser(id,()=>addToast("удалено удачно", { appearance: 'info' }))
    }
    return (
        <Paper className={classes.paper} elevation={3}>
                <Grid item xs={12}>
                    <DUserForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Divider/>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>ИД</TableCell>
                                    <TableCell>Тариф</TableCell>
                                    <TableCell>Логин</TableCell>
                                    <TableCell>Пароль</TableCell>
                                    <TableCell>Имя</TableCell>
                                    <TableCell>Фамилия</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.DUserList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.id}</TableCell>
                                            <TableCell>{record.idPricing}</TableCell>
                                            <TableCell>{record.login}</TableCell>
                                            <TableCell>{record.password}</TableCell>
                                            <TableCell>{record.name}</TableCell>
                                            <TableCell>{record.surname}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => setCurrentId(record.id)} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
        </Paper>
    );
}
//console.log("DUsers state", state)
const mapStateToProps = state => ({
    DUserList: state.DUser.list
})

const mapActionToProps = {
    fetchAllDUsers: actions.fetchAll,
    deleteDUser: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DUsers));