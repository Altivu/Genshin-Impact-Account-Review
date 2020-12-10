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
    padding: '5px 10px',
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
  characterIcon: {
    position: 'absolute',
    height: '30px',
    width: '30px',
    borderRadius: '50%'
  },
  equippedText: {
    paddingLeft: '35px'
  },
  fourStar: {
    backgroundColor: 'rgb(133, 103, 167)'
  },
  fiveStar: {
    backgroundColor: 'rgb(167, 108, 40)'
  },
  fourStarGradient: {
    background: 'linear-gradient(135deg, grey, rgb(133, 103, 167))'
  },
  fiveStarGradient: {
    background: 'linear-gradient(135deg, grey, rgb(167, 108, 40))'
  }
}))

const ArtifactAttributesComponent = ({
  artifact,
  artifactImage,
  bMainPage
}) => {
  const classes = useStyles()

  return (
    <div className={classes.box}>
      {artifact.Name && (
        <>
          <div
            className={`${classes.title} ${
              artifact.Rarity === 4 ? classes.fourStar : classes.fiveStar
            }`}
          >
            <span>{artifact.Name}</span>
          </div>
          <div
            className={`${classes.banner} ${
              artifact.Rarity === 4
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
                <Grid item>{artifact.Slot && artifact.Slot.substring(3)}</Grid>
                <Grid item>
                  {/* Text */}
                  <div className={classes.primaryText}>
                    {artifact['Primary Stat'] &&
                      artifact['Primary Stat']
                        .split(' ')
                        .slice(1)
                        .join(' ')}
                  </div>
                  {/* Number */}
                  <div className={classes.primaryNumber}>
                    {artifact['Primary Stat'] &&
                      // Regex yoinked from https://stackoverflow.com/a/2901298
                      artifact['Primary Stat']
                        .split(' ')[0]
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                  </div>
                  {/* Stars */}
                  <div className={classes.starContainer}>
                    {artifact.Rarity &&
                      [...Array(artifact.Rarity)].map((key, index) => {
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
                  src={(artifactImage && artifactImage['Image URL']) || ''}
                  alt='Artifact'
                  className={classes.image}
                />
              </Grid>
            </Grid>
          </div>
          <div className={classes.statsContainer}>
            <div className={classes.level}>+{artifact['Level']}</div>
            <ul>
              <li>• {artifact['Secondary Stat 1']}</li>
              {artifact['Secondary Stat 2'] && (
                <li>• {artifact['Secondary Stat 2']}</li>
              )}
              {artifact['Secondary Stat 3'] && (
                <li>• {artifact['Secondary Stat 3']}</li>
              )}
              {artifact['Secondary Stat 4'] && (
                <li>• {artifact['Secondary Stat 4']}</li>
              )}
            </ul>
          </div>
          {artifact['Character'] && bMainPage && (
            <div className={classes.equipped}>
              <img
                src={
                  artifact.Character !== 'Lumine'
                    ? `https://rerollcdn.com/GENSHIN/Characters/${artifact.Character}.png`
                    : Lumine
                }
                alt={artifact.Character}
                className={classes.characterIcon}
              />
              <div className={classes.equippedText}>
                Equipped: {artifact.Character}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ArtifactAttributesComponent
