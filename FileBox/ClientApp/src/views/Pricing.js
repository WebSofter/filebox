import React, { useState, useEffect }  from 'react';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as actions from "../actions/DPricing";
import {
  useHistory, useLocation,
  withRouter,
  BrowserRouter as Router,
  Switch,
  loginRequest,
  Route,
  Link
} from "react-router-dom";

const styles = theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
})
/*
id: 1
name: "Start"
volume: 2000
price: 0
users: 10
status: null
*/
let tiers = [
  {
    name: 'Free',
    price: '0',
    description: [
      '10 пользователей', 
      '2 GB памяти', 
      'Техподдержка',
    ],
    buttonText: 'Использовать',
    buttonVariant: 'outlined',
  },
  {
    name: 'Pro',
    subheader: 'Популярный',
    price: '299',
    description: [
      '20 пользователей',
      '10 GB памяти',
      'Техподдержка',
    ],
    buttonText: 'Использовать',
    buttonVariant: 'contained',
  },
  {
    name: 'Enterprise',
    price: '499',
    description: [
      '50 пользователей',
      '30 GB памяти',
      'Техподдержка',
    ],
    buttonText: 'Свяжитесь с нами',
    buttonVariant: 'outlined',
  },
];




const Pricing = ({ classes, ...props }) => {
  
    useEffect(() => {
        props.fetchAllDPricings()
    }, [])//componentDidMount

    
    return (
      <React.Fragment>
        <CssBaseline />
        {/* Hero unit */}
        <Container maxWidth="sm" component="main" className={classes.heroContent}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Тарифные планы
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" component="p">
            Выберите для себя удобный тарифный план, чтобы чувствовать себя комфортно в вашей повседневной рабочей деятельности.
          </Typography>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map((pricing) => (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={pricing.name} xs={12} sm={pricing.name === 'Enterprise' ? 12 : 6} md={4}>
                <Card>
                  <CardHeader
                    title={pricing.name}
                    subheader={pricing.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    action={pricing.name === 'Pro' ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography component="h2" variant="h3" color="textPrimary">
                        ₽{pricing.price}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        /мес
                      </Typography>
                    </div>
                    <ul>
                      {pricing.description.map((line) => (
                        <Typography component="li" variant="subtitle1" align="center" key={line}>
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    
                      <Button fullWidth variant={pricing.buttonVariant} color="primary">
                        <Link to="/profile">{pricing.buttonText}</Link>
                      </Button>
                    
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </React.Fragment>
    )
  
}

const mapStateToProps = state => ({
  DPricingList: state.DPricing.list
})

const mapActionToProps = {
  fetchAllDPricings: actions.fetchAll,
  deleteDPricing: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Pricing));
