import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { NavLink } from 'react-router-dom'

import { AppBar, Toolbar, Grid } from '@material-ui/core'

import AdventurerIcon from "../assets/images/Icon_Adventurers'_Guild.webp"

const useStyles = makeStyles(theme => ({
  nav: {
    backgroundImage: 'linear-gradient(135deg, grey, black)'
  },
  logo: {
    display: 'flex',
    fontSize: '24px',
    verticalAlign: 'middle',
    '& img': {
      width: '50px',
      height: '50px',
      '&:hover': {
        filter: 'invert(75%)'
      }
    }
  },
  active: {
    color: 'red',
    textDecoration: 'underline'
  }
}))

const Navbar = () => {
  const classes = useStyles()

  return (
    <AppBar className={classes.nav}>
      <Toolbar>
        <Grid container justify='space-between' alignItems='center'>
          <Grid container item xs={4}>
            <NavLink to='/' className={classes.logo}>
              <img src={AdventurerIcon} alt='Logo' />
            </NavLink>
          </Grid>
          <Grid container item xs={8} justify='space-between'>
            <Grid item>
              <NavLink to='/overview' activeClassName={classes.active}>
                Overview
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to='/characters' activeClassName={classes.active}>
                Characters
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to='/weapons' activeClassName={classes.active}>
                Weapons
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to='/artifacts' activeClassName={classes.active}>
                Artifacts
              </NavLink>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
