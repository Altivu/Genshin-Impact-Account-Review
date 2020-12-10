import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

import { Grid } from '@material-ui/core'

import Lumine from '../assets/images/Character_Lumine_Thumb.webp'

const useStyles = makeStyles(theme => ({
  box: {
    width: '100%',
    padding: '10px'
  },
  title: {
    height: '30px',
    backgroundColor: 'rgb(167, 108, 40)',
    color: 'white',
    border: '1px solid black',
    paddingLeft: '10px',
    fontSize: '18px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '& span': {
      // All three of these attributes are required to vertically align the text using this method
      height: '30px',
      display: 'table-cell',
      verticalAlign: 'middle'
    }
  },
  banner: {
    color: 'white',
    borderBottom: '1px solid black',
    padding: '10px'
  },
  primaryText: {
    fontSize: '12px'
  },
  primaryTextGrey: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '12px'
  },
  primaryNumber: {
    fontSize: '20px'
  },
  starContainer: {},
  star: {
    width: '14px',
    height: '14px',
    paddingRight: '2px'
  },
  image: {
    width: '100px',
    height: '100px'
  },
  statsContainer: {
    backgroundColor: 'rgb(237, 229, 216)',
    padding: '10px 10px',
    '& ul': {
      paddingLeft: '2px',
      listStyle: 'none',
      color: 'rgb(55, 68, 77)'
    }
  },
  level: {
    display: 'inline-block',
    padding: '0 5px',
    fontSize: '12px',
    borderRadius: '2px',
    backgroundColor: 'rgb(55, 68, 77)',
    color: 'rgb(255, 255, 255)'
  },
  equipped: {
    display: 'flex',
    color: 'rgb(55, 68, 77)',
    padding: '2px 10px',
    fontSize: '14px',
    backgroundColor: 'rgb(255, 231, 187)',
    alignItems: 'center'
  },
  refinementText: {
    fontSize: '12px',
    color: 'rgb(204, 176, 127)'
  },
  rank: {
    width: '14px',
    height: '14px',
    fontSize: '12px',
    borderRadius: '2px',
    textAlign: 'center',
    backgroundColor: weapon => {
      return weapon['Refinement Rank'] === 5
        ? 'rgb(253, 220, 103)'
        : 'rgba(0, 0, 0, 0.5)'
    },
    color: 'rgb(255, 255, 255)'
  },
  characterIcon: {
    position: 'absolute',
    height: '30px',
    width: '30px',
    borderRadius: '50%'
  },
  equippedText: {
    paddingLeft: '35px'
  },
  threeStar: {
    backgroundColor: 'rgb(87, 135, 163)'
  },
  fourStar: {
    backgroundColor: 'rgb(133, 103, 167)'
  },
  fiveStar: {
    backgroundColor: 'rgb(167, 108, 40)'
  },
  threeStarGradient: {
    background: 'linear-gradient(135deg, grey, rgb(87, 135, 163))'
  },
  fourStarGradient: {
    background: 'linear-gradient(135deg, grey, rgb(133, 103, 167))'
  },
  fiveStarGradient: {
    background: 'linear-gradient(135deg, grey, rgb(167, 108, 40))'
  }
}))

const WeaponAttributesComponent = ({ weapon, bMainPage }) => {
  const classes = useStyles(weapon)

  return (
    <div className={classes.box}>
      {weapon && weapon.Name && (
        <>
          <div
            className={`${classes.title} ${
              weapon.Rarity === 3
                ? classes.threeStar
                : weapon.Rarity === 4
                ? classes.fourStar
                : classes.fiveStar
            }`}
          >
            <span>{weapon.Name}</span>
          </div>
          <div
            className={`${classes.banner} ${
              weapon.Rarity === 3
                ? classes.threeStarGradient
                : weapon.Rarity === 4
                ? classes.fourStarGradient
                : classes.fiveStarGradient
            }`}
          >
            <Grid container>
              <Grid
                item
                container
                direction='column'
                justify='space-between'
                xs={8}
              >
                <Grid item className={classes.primaryText}>
                  {weapon['Weapon Type']}
                </Grid>
                <Grid item className={classes.primaryTextGrey}>
                  {weapon['Secondary'] &&
                    weapon['Secondary']
                      .split(' ')
                      .slice(1)
                      .join(' ')}
                </Grid>
                <Grid item className={classes.primaryText}>
                  {weapon['Secondary'] && weapon['Secondary'].split(' ')[0]}
                </Grid>
                <Grid item className={classes.primaryTextGrey}>
                  Base Attack
                </Grid>
                <Grid item className={classes.primaryNumber}>
                  {weapon['Base ATK']}
                </Grid>
                <Grid item>
                  {/* Stars */}
                  <div className={classes.starContainer}>
                    {weapon.Rarity &&
                      [...Array(weapon.Rarity)].map((key, index) => {
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
                </Grid>
              </Grid>
              <Grid item container xs={4} justify='center' alignItems='center'>
                <img
                  src={
                    weapon.Name !== 'The Black Sword'
                      ? `https://rerollcdn.com/GENSHIN/Weapon/NEW/${weapon.Name.split(
                          ' '
                        ).join('_')}.png`
                      : 'https://static.wikia.nocookie.net/gensin-impact/images/c/cf/Weapon_The_Black_Sword.png'
                  }
                  alt={weapon.Name}
                  className={classes.image}
                />
              </Grid>
            </Grid>
          </div>
          <div className={classes.statsContainer}>
            <Grid container direction='column' spacing={1}>
              <Grid item>
                <div className={classes.level}>
                  {`Lv. ${weapon.Level}`}

                  <span className={classes.primaryTextGrey}>{`/${
                    [20, 40, 50, 60, 70, 80, 90][
                      parseInt(weapon['Ascension Level'])
                    ]
                  }`}</span>
                </div>
              </Grid>
              <Grid
                container
                item
                direction='row'
                alignContent='center'
                spacing={1}
              >
                <Grid item>
                  <div className={classes.rank}>
                    {weapon['Refinement Rank']}
                  </div>
                </Grid>
                <Grid item>
                  <div className={classes.refinementText}>
                    Refinement Rank {weapon['Refinement Rank']}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </div>

          {weapon['Character'] && bMainPage && (
            <div className={classes.equipped}>
              <img
                src={
                  weapon.Character !== 'Lumine'
                    ? `https://rerollcdn.com/GENSHIN/Characters/${weapon.Character}.png`
                    : Lumine
                }
                alt={weapon.Character}
                className={classes.characterIcon}
              />
              <div className={classes.equippedText}>
                Equipped: {weapon.Character}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default WeaponAttributesComponent
