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
    border: ({ artifact, currentArtifact }) => {
      return artifact === currentArtifact ? '3px double white' : ''
    },
    margin: ({ artifact, currentArtifact }) => {
      return artifact === currentArtifact ? '-3px' : 0
    }
  },
  image: {
    position: 'relative',
    width: '100%',
    height: '70px',
    borderRadius: '5px 5px 10px 0',
    fontSize: '8px',
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
    bottom: '40px',
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
    bottom: '130px',
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

const ArtifactComponent = ({ artifact, currentArtifact, artifactImage }) => {
  const classes = useStyles({ artifact, currentArtifact })

  return (
    <Paper
      key={artifact.Name + artifact.Character}
      variant='outlined'
      className={classes.paper}
    >
      <img
        src={artifactImage ? artifactImage['Image URL'] : ''}
        alt={artifact.Name}
        className={`${classes.image} ${
          artifact.Rarity === 3
            ? classes.threeStar
            : artifact.Rarity === 4
            ? classes.fourStar
            : classes.fiveStar
        }`}
      />
      {/* Why is there a random space between the image and the level? Need to use relative positioning to "fix" */}
      <div className={classes.level}>+{artifact.Level}</div>
      <div className={classes.starContainer}>
        {[...Array(artifact.Rarity)].map((key, index) => {
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
      {artifact.Character && (
        <img
          src={
            artifact.Character !== 'Lumine'
              ? `https://rerollcdn.com/GENSHIN/Characters/${artifact.Character}.png`
              : Lumine
          }
          alt={artifact.Character}
          className={classes.characterIcon}
        />
      )}
    </Paper>
  )
}

export default ArtifactComponent
