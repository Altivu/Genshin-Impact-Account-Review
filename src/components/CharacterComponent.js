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
    border: ({ character }) => {
      return character['Max HP'] ? '3px outset aquamarine' : ''
    },
    margin: ({ character }) => {
      return character['Max HP'] ? '-3px' : 0
    },
    cursor: ({ character }) => {
      return character['Max HP'] ? 'pointer' : 'auto'
    }
  },
  elementIcon: {
    position: 'absolute',
    height: '20px',
    width: '20px',
    zIndex: 3
  },
  characterImage: {
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
  fourStar: {
    backgroundColor: 'rgb(133, 103, 167)'
  },
  fiveStar: {
    backgroundColor: 'rgb(167, 108, 40)'
  }
}))

const CharacterComponent = ({
  character,
  handleBDialogOpenTrue,
  handleSelectedCharacterChange
}) => {
  const classes = useStyles({ character })

  return (
    <Paper
      key={character.Name}
      variant='outlined'
      className={classes.paper}
      onClick={() => {
        if (character['Max HP']) {
          handleSelectedCharacterChange(character)
          handleBDialogOpenTrue()
        }
      }}
    >
      <img
        src={`https://rerollcdn.com/GENSHIN/Elements/Element_${character.Element}.png`}
        alt={character.Name}
        className={classes.elementIcon}
      ></img>
      <img
        src={
          character.Name !== 'Lumine'
            ? `https://rerollcdn.com/GENSHIN/Characters/${character.Name}.png`
            : Lumine
        }
        alt={character.name}
        className={`${classes.characterImage} ${
          character.Rarity === 4 ? classes.fourStar : classes.fiveStar
        }`}
      ></img>
      {/* Why is there a random space between the image and the level? Need to use relative positioning to "fix" */}
      <div className={classes.level}>
        Lv. {character.Level} | C{character.Constellation}
      </div>
    </Paper>
  )
}

export default CharacterComponent
