import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'

import { Grid, Typography } from '@material-ui/core'

import WeaponComponent from '../components/WeaponComponent'
import WeaponAttributesComponent from '../components/WeaponAttributesComponent'

const useStyles = makeStyles(theme => ({
  container: {
    padding: '20px'
  },
  startText: {
    color: 'white',
    fontSize: '12px',
    padding: '10px 0'
  },
  backgroundImage: {
    position: 'absolute',
    top: '-100px',
    left: '50px',
    opacity: 0.05
  }
}))

const Weapons = ({ weapons }) => {
  const classes = useStyles()

  const [currentWeapon, setCurrentWeapon] = useState({})

  return (
    <div className={classes.container}>
      <Typography className={classes.startText}>
        I probably have at least one of all the three star weapons, but am not
        including them here.
      </Typography>
      <Grid container>
        <Grid container item xs={8} spacing={2}>
          {weapons.map &&
            weapons.map(weapon => (
              <Grid
                item
                xs={4}
                sm={3}
                md={2}
                key={weapon.Name + weapon.Character}
              >
                <div
                  onClick={() => {
                    setCurrentWeapon(weapon)
                  }}
                >
                  <WeaponComponent
                    weapon={weapon}
                    currentWeapon={currentWeapon}
                  />
                </div>
              </Grid>
            ))}
        </Grid>
        <Grid container item xs={4} className={classes.attributes}>
          <WeaponAttributesComponent weapon={currentWeapon} bMainPage={true} />
        </Grid>
      </Grid>
      <img
        src='https://i.redd.it/3zbhfwgoed451.png'
        alt='Sadge'
        className={classes.backgroundImage}
      />
    </div>
  )
}

export default Weapons
