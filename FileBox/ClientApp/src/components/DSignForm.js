import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Grid, TextField, withStyles, Select, MenuItem, Button} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import signForm from "./signForm";
import { connect } from "react-redux";
import * as actions from "../actions/DUser";
import { useToasts } from "react-toast-notifications";

import "./../custom.css";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
})


const initialFieldValues = {
  //id: null,
  idPricing: null,
  login: '',
  password: '',
  name: '',
  surname: ''
}


const DSignForm = ({ classes, ...props }) => {
  //const classes = useStyles();
    //toast msg.
    const { addToast } = useToasts()
    


    const [formToggler, setFormToggler] = useState(0);
    let toggleForm = (e)=>setFormToggler((formToggler ? false : true));

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('login' in fieldValues)
            temp.Name = fieldValues.login ? "" : "Данное поле обязательно."
        if ('password' in fieldValues)
            temp.Name = fieldValues.password ? "" : "Данное поле обязательно."  
        if ('idPricing' in fieldValues && formToggler)
            temp.IdPricing = fieldValues.idPricing ? "" : "Данное поле обязательно."          
        if ('name' in fieldValues && formToggler)
            temp.Name = fieldValues.name ? "" : "Данное поле обязательно."
        if ('surname' in fieldValues && formToggler)
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
  } = signForm(initialFieldValues, validate)

    //material-ui select

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    /*
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
    */
    const history = useHistory();
    const handleSubmit = (e, action) => {
        e.preventDefault()
        if (validate()) {
          
            const onSuccess = () => {
              addToast("отправлено удачно", { appearance: 'success' })
              history.push("/home");
            }
            const onWarningIn = () =>{
              addToast("неправильный логин или пароль", { appearance: 'warning' })
            }
            const onErrorIn = () =>{
              addToast("произошла ошибка входа", { appearance: 'error' })
            }

            const onWarningUp = () =>{
              addToast("такой логин уже существует", { appearance: 'error' })
            }
            const onErrorUp = () =>{
              addToast("не удалось зарегистрироваться", { appearance: 'error' })
            }

            if(action == "signIn"){
              props.signInDUser({login: values.login, password: values.password}, onSuccess, onWarningIn, onErrorIn)
            }
            if(action == "signUp"){
              props.signUpDUser(values, onSuccess, onWarningUp, onErrorUp)
            }
        }else{
          addToast("не все поля заполнены", { appearance: 'error' })
        }
        
    }
    /*
    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.DUserList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])
    */
  //

  return (


    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper} style={{display: (formToggler ? "none" : "block")}}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <form className={classes.form} autoComplete="off" onSubmit={(e)=>handleSubmit(e, "signIn")}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Логин"
            name="login"
            autoComplete="login"
            autoFocus

            value={values.login ? values.login : ""}
            onChange={handleInputChange}
            {...(errors.login && { error: true, helperText: errors.login })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            autoComplete="password"

            value={values.password ? values.password : ""}
            onChange={handleInputChange}
            {...(errors.password && { error: true, helperText: errors.password })}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="запомнить меня"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Вход
          </Button>
          <Grid container justify="flex-end">
            {/*}
            <Grid item xs>
              <Link href="#" variant="body2">
                Забыли пароль?
              </Link>
            </Grid>
            */}
            <Grid item>
              <Button color="primary" onClick={toggleForm}>
                У вас нет аккаунта? Регистрация
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <div className={classes.paper} style={{display: (formToggler ? "block" : "none")}}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e)=>handleSubmit(e, "signUp")}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                variant="outlined"
                required
                fullWidth
                label="Логин"
                name="login"
                autoComplete="login"

                value={values.login ? values.login : ""}
                onChange={handleInputChange}
                {...(errors.login && { error: true, helperText: errors.login })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                autoComplete="password"

                value={values.password ? values.password : ""}
                onChange={handleInputChange}
                {...(errors.password && { error: true, helperText: errors.password })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="name"
                label="Имя"
                type="text"
                autoComplete="name"

                value={values.name ? values.name : ""}
                onChange={handleInputChange}
                {...(errors.name && { error: true, helperText: errors.name })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="surname"
                label="Фамилия"
                type="text"
                autoComplete="surname"

                value={values.surname ? values.surname : ""}
                onChange={handleInputChange}
                {...(errors.surname && { error: true, helperText: errors.surname })}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                  variant="outlined"
                  required
                  fullWidth
                  name="idPricing"
                  label="Тариф"
                  value="1"
                  autoComplete="idPricing"

                  value={values.idPricing ? values.idPricing : 0}
                  onChange={handleInputChange}
                  {...(errors.idPricing && { error: true, helperText: errors.idPricing })}
              >
                  <MenuItem selected={true} value="1">Free</MenuItem>
                  <MenuItem value="2">Pro</MenuItem>
                  <MenuItem value="3">Enterprise</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Регистрация
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button color="primary" onClick={toggleForm}>
                Увас есть аккаунт? Вход
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  DUserList: state.DUser.list
})

const mapActionToProps = {
  signInDUser: actions.signIn,
  signUpDUser: actions.signUp
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DSignForm));