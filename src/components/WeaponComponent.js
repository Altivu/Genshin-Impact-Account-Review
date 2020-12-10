import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { Paper } from '@material-ui/core'

import Lumine from '../assets/images/Character_Lumine_Thumb.webp'

const useStyles = makeStyles(theme => ({
  paper: {
    width: '70px',
    height: '87px',
    textAlign: 'center',
    borderRadius: '5px 5px 10px 5px',
    '&:hover': {
      border: '2px solid grey',
      margin: '-2px'
    },
    border: ({ weapon, currentWeapon }) => {
      return weapon === currentWeapon ? '3px double white' : ''
    },
    margin: ({ weapon, currentWeapon }) => {
      return weapon === currentWeapon ? '-3px' : 0
    }
  },
  rank: {
    width: '14px',
    height: '14px',
    position: 'relative',
    zIndex: 3,
    bottom: '95px',
    left: '5px',
    fontSize: '12px',
    borderRadius: '2px',
    backgroundColor: ({ weapon }) => {
      return weapon['Refinement Rank'] === 5
        ? 'rgba(253, 220, 103, 0.5)'
        : 'rgba(0, 0, 0, 0.5)'
    },
    color: 'rgb(255, 255, 255)'
  },
  image: {
    position: 'relative',
    width: '100%',
    height: '70px',
    borderRadius: '5px 5px 10px 0',
    zIndex: 2
  },
  level: {
    position: 'relative',
    bottom: '12px',
    paddingTop: '10px',
    backgroundColor: 'rgb(233, 229, 220)',
    fontSize: '11px',
    padding: '1px',
    borderRadius: '0 0 5px 5px',
    zIndex: 1
  },
  starContainer: {
    position: 'relative',
    bottom: '56px',
    zIndex: 3
  },
  star: {
    width: '12px',
    height: '12px'
  },
  characterIcon: {
    position: 'relative',
    height: '25px',
    width: '25px',
    bottom: '140px',
    left: '30px',
    border: '1px solid white',
    borderRadius: '50%',
    backgroundColor: 'rgb(70, 78, 96)',
    zIndex: 3
  },
  threeStar: {
    backgroundColor: 'rgb(87, 135, 163)'
  },
  fourStar: {
    backgroundColor: 'rgb(133, 103, 167)'
  },
  fiveStar: {
    backgroundColor: 'rgb(167, 108, 40)'
  }
}))

const WeaponComponent = ({ weapon, currentWeapon }) => {
  const classes = useStyles({ weapon, currentWeapon })

  return (
    <Paper
      key={weapon.Name + weapon.Character}
      variant='outlined'
      className={classes.paper}
    >
      <img
        src={
          weapon.Name !== 'The Black Sword'
            ? `https://rerollcdn.com/GENSHIN/Weapon/NEW/${weapon.Name.split(
                ' '
              ).join('_')}.png`
            : 'https://static.wikia.nocookie.net/gensin-impact/images/c/cf/Weapon_The_Black_Sword.png'
        }
        alt={weapon.Name}
        className={`${classes.image} ${
          weapon.Rarity === 3
            ? classes.threeStar
            : weapon.Rarity === 4
            ? classes.fourStar
            : classes.fiveStar
        }`}
      />
      {/* Why is there a random space between the image and the level? Need to use relative positioning to "fix" */}
      <div className={classes.level}>Lv. {weapon.Level}</div>
      <div className={classes.rank}>{weapon['Refinement Rank']}</div>
      <div className={classes.starContainer}>
        {[...Array(weapon.Rarity)].map((key, index) => {
          return (
            <img
              key={index}
              src='https://static.wikia.nocookie.net/gensin-impact/images/b/b7/Icon_1_Star.png'
              alt='star'
              className={classes.star}
            />
          )
        })}
      </div>
      {weapon.Character && (
        <img
          src={
            weapon.Character !== 'Lumine'
              ? `https://rerollcdn.com/GENSHIN/Characters/${weapon.Character}.png`
              : Lumine
          }
          alt={weapon.Character}
          className={classes.characterIcon}
        />
      )}
    </Paper>
  )
}

export default WeaponComponent
