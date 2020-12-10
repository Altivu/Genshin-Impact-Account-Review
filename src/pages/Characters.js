import { makeStyles } from '@material-ui/core/styles'
import React, { useLayoutEffect, useState } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Typography
} from '@material-ui/core'

import CloseIcon from '@material-ui/icons/Close'

import CharacterComponent from '../components/CharacterComponent'
import WeaponAttributesComponent from '../components/WeaponAttributesComponent'
import ArtifactAttributesComponent from '../components/ArtifactAttributesComponent'

const useStyles = makeStyles(theme => ({
  container: {
    padding: '20px'
  },
  statMain: {
    color: 'green'
  },
  description: {
    color: 'white'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  dialog: {
    color: 'white',
    backgroundColor: '#303030'
  }
}))

const Characters = props => {
  const classes = useStyles()

  const [selectedCharacter, setSelectedCharacter] = useState({})
  const handleSelectedCharacterChange = character => {
    setSelectedCharacter(character)
  }

  const [characterStatsMain, setCharacterStatsMain] = useState({})
  const [characterStatsOther, setCharacterStatsOther] = useState({})
  const [characterWeapon, setCharacterWeapon] = useState({})
  const [characterArtifacts, setCharacterArtifacts] = useState({})

  const [bDialogOpen, setBDialogOpen] = useState(false)
  const handleBDialogOpenTrue = () => {
    setBDialogOpen(true)
  }
  const handleBDialogOpenFalse = () => {
    setBDialogOpen(false)
    setTimeout(() => {
      setSelectedCharacter({})
    }, 200)
  }

  useLayoutEffect(() => {
    const statsSubsetMain = ['Max HP', 'ATK', 'DEF']

    const statsSubsetOther = [
      'Elemental Mastery',
      'CRIT Rate',
      'CRIT DMG',
      'Healing Bonus',
      'Energy Recharge',
      'Pyro DMG Bonus',
      'Hydro DMG Bonus',
      'Dendro DMG Bonus',
      'Electro DMG Bonus',
      'Anemo DMG Bonus',
      'Cryo DMG Bonus',
      'Geo DMG Bonus',
      'Physical DMG Bonus'
    ]

    setCharacterStatsMain(
      statsSubsetMain.reduce((acc, o) => {
        if (selectedCharacter[o]) {
          acc[o] = selectedCharacter[o]
        }

        return acc
      }, {})
    )

    setCharacterStatsOther(
      statsSubsetOther.reduce((acc, o) => {
        if (selectedCharacter[o] !== undefined) {
          if (
            ['CRIT', 'Bonus', 'Energy'].some(element => o.includes(element))
          ) {
            acc[o] = (selectedCharacter[o] * 100).toFixed(1) + '%'
          } else {
            acc[o] = selectedCharacter[o]
          }
        }

        return acc
      }, {})
    )

    if (props.weapons.filter) {
      setCharacterWeapon(
        props.weapons.filter(weapon => {
          return (
            selectedCharacter.Name !== undefined &&
            selectedCharacter.Name === weapon.Character
          )
        })
      )
    }

    if (props.artifacts.filter) {
      setCharacterArtifacts(
        props.artifacts
          .filter(artifact => {
            return (
              selectedCharacter.Name !== undefined &&
              selectedCharacter.Name === artifact.Character
            )
          })
          .sort((a, b) => {
            return a.Slot > b.Slot
          })
      )
    }
  }, [selectedCharacter, props.weapons, props.artifacts])

  return (
    <div className={classes.container}>
      <Grid container>
        <Grid container xs={6} spacing={2}>
          {props.characters.map &&
            props.characters
              .filter(c => {
                return c.Obtained
              })
              .map(character => (
                <Grid
                  container
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2}
                  key={character.Name}
                >
                  <CharacterComponent
                    character={character}
                    handleBDialogOpenTrue={handleBDialogOpenTrue}
                    handleSelectedCharacterChange={
                      handleSelectedCharacterChange
                    }
                  />
                </Grid>
              ))}
        </Grid>

        <Grid container xs={6} className={classes.description}>
          <Typography>
            Characters with a green border can be clicked on to show their stats
            (they are currently considered my "main party").
          </Typography>
          <Typography>
            Beyond Xiangling and Ningguang as my main DPSers, I have not really
            hard committed to anyone (as you can tell by the non-existent talent
            levels and random equipment), so I am okay with drastically shifting
            things around if you think it will help.
          </Typography>
          <Typography>
            My generic abyss teams:
            <br />
            <br />
            Team 1: Ningguang - Noelle - Diona/Barbara - Lumine/Amber
            <br />
            Team 2: Xiangling - Chongyun - Barbara/Diona - Amber/Lumine
          </Typography>
        </Grid>
      </Grid>

      <Dialog open={bDialogOpen} onClose={handleBDialogOpenFalse} maxWidth='lg'>
        {selectedCharacter !== {} && (
          <div className={classes.dialog}>
            <DialogTitle onClose={handleBDialogOpenFalse}>
              {selectedCharacter.Name}
              <IconButton
                className={classes.closeButton}
                onClick={handleBDialogOpenFalse}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container>
                <Grid item container xs={12} sm={6}>
                  <TableContainer>
                    <Table size='small'>
                      <TableBody>
                        {Object.entries(characterStatsMain).map(
                          ([key, value]) => {
                            return (
                              <TableRow key={key}>
                                <TableCell>
                                  <span className={classes.dialog}>{key}</span>
                                </TableCell>
                                <TableCell>
                                  <span className={classes.dialog}>
                                    {parseInt(
                                      value.split('+')[0]
                                    ).toLocaleString()}
                                    <span className={classes.statMain}>
                                      {` +${parseInt(
                                        value.split('+')[1]
                                      ).toLocaleString()}`}
                                    </span>{' '}
                                    (
                                    {value
                                      .split('+')
                                      .reduce((accumulator, currentValue) => {
                                        return (
                                          accumulator + parseInt(currentValue)
                                        )
                                      }, 0)
                                      .toLocaleString()}
                                    )
                                  </span>
                                </TableCell>
                              </TableRow>
                            )
                          }
                        )}
                        {Object.entries(characterStatsOther).map(
                          ([key, value]) => {
                            return (
                              <TableRow>
                                <TableCell>
                                  <span className={classes.dialog}>{key}</span>
                                </TableCell>
                                <TableCell>
                                  <span className={classes.dialog}>
                                    {value}
                                  </span>
                                </TableCell>
                              </TableRow>
                            )
                          }
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                <Grid
                  item
                  container
                  xs={12}
                  sm={2}
                  direction='column'
                  alignItems='center'
                >
                  <Grid item>Talents</Grid>
                  <Grid item>
                    {selectedCharacter['Talent 1']} -{' '}
                    {selectedCharacter['Talent 2']} -{' '}
                    {selectedCharacter['Talent 3']}
                  </Grid>
                </Grid>

                <Grid item container xs={12} sm={4}>
                  <WeaponAttributesComponent
                    weapon={characterWeapon[0]}
                    bMainPage={false}
                  />
                </Grid>

                <Grid item container xs={12} direction='row'>
                  {characterArtifacts.map &&
                    characterArtifacts.map(artifact => {
                      return (
                        <Grid
                          container
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          justify='center'
                          alignItems='center'
                        >
                          <ArtifactAttributesComponent
                            artifact={artifact}
                            artifactImage={
                              props.artifactImages.find &&
                              props.artifactImages.find(row => {
                                return row.Name === artifact.Name
                              })
                            }
                            bMainPage={false}
                          />
                        </Grid>
                      )
                    })}
                </Grid>
              </Grid>
            </DialogContent>
          </div>
        )}
      </Dialog>
    </div>
  )
}

export default Characters
