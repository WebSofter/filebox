import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/DFolder";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    //id: null,
    idPricing: null,
    login: '',
    password: '',
    name: '',
    surname: ''
}

const DContentForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()

    //validate()
    //validate({fullName:'jenny'})
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        /*
        if ('id' in fieldValues)
            temp.Id = fieldValues.id ? "" : "Данное поле обязательно."
        */
        if ('idPricing' in fieldValues)
            temp.IdPricing = fieldValues.idPricing ? "" : "Данное поле обязательно."
        if ('login' in fieldValues)
            temp.Name = fieldValues.login ? "" : "Данное поле обязательно."
        if ('password' in fieldValues)
            temp.Name = fieldValues.password ? "" : "Данное поле обязательно."            
        if ('name' in fieldValues)
            temp.Name = fieldValues.name ? "" : "Данное поле обязательно."
        if ('surname' in fieldValues)
            temp.Name = fieldValues.surname ? "" : "Данное поле обязательно."
        /*
        if ('email' in fieldValues)
            temp.email = (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
            */
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("отправлено удачно", { appearance: 'success' })
            }
            if (props.currentId == 0)
                props.createDUser(values, onSuccess)
            else
                props.updateDUser(props.currentId, values, onSuccess)
        }
    }
    props.currentId = 0;
    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.DUserList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        name="id"
                        variant="outlined"
                        label="ИД"
                        value={values.id ? values.id : ""}
                        onChange={handleInputChange}
                        disabled={true}
                        {...(errors.id && { error: true, helperText: errors.id })}
                    />
                    <FormControl variant="outlined"
                        className={classes.formControl}
                        {...(errors.bloodGroup && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Тариф</InputLabel>
                        <Select
                            name="idPricing"
                            value={values.idPricing ? values.idPricing : ""}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="1">Free</MenuItem>
                            <MenuItem value="2">Pro</MenuItem>
                            <MenuItem value="3">Enterprise</MenuItem>
                        </Select>
                        {errors.idPricing && <FormHelperText>{errors.idPricing}</FormHelperText>}
                    </FormControl>
                    <TextField
                        name="login"
                        variant="outlined"
                        label="Логин"
                        value={values.login ? values.login : ""}
                        onChange={handleInputChange}
                        {...(errors.login && { error: true, helperText: errors.login })}
                    />
                    <TextField
                        name="password"
                        variant="outlined"
                        label="Пароль"
                        value={values.password ? values.password : ""}
                        onChange={handleInputChange}
                        {...(errors.password && { error: true, helperText: errors.password })}
                    />
                    <TextField
                        name="name"
                        variant="outlined"
                        label="Имя"
                        value={values.name ? values.name : ""}
                        onChange={handleInputChange}
                        {...(errors.name && { error: true, helperText: errors.name })}
                    />
                    <TextField
                        name="surname"
                        variant="outlined"
                        label="Фамилия"
                        value={values.surname ? values.surname : ""}
                        onChange={handleInputChange}
                        {...(errors.surname && { error: true, helperText: errors.surname })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Сохранить
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Отмена
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    DUserList: state.DFolder.list
})

const mapActionToProps = {
    createDUser: actions.create,
    updateDUser: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DContentForm));