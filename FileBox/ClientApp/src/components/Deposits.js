import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { Paper } from '@material-ui/core';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({ 
  depositContext: {
    flex: 1,
  },
  fragment: {
    padding: "10px"
  }
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment className={classes.fragment}>
      <Paper style={{padding:"10px"}}>
        <Title>Данные</Title>
        <Typography component="p" variant="h4">
          303 файла
        </Typography>
        <Typography color="textSecondary" className={classes.depositContext}>
        общий размер 320 МБ
        </Typography>
        <Typography component="p" variant="h4">
          45 папок
        </Typography>
        <div>
          <Link color="primary" href="#" onClick={preventDefault}>
            Показать отчет
          </Link>
        </div>
      </Paper>
  </React.Fragment>
  );
}
