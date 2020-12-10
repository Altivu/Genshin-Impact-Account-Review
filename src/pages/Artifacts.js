import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'

import { Button, Grid, Typography } from '@material-ui/core'

import ArtifactComponent from '../components/ArtifactComponent'
import ArtifactAttributesComponent from '../components/ArtifactAttributesComponent'
import ArtifactFiltersComponent from '../components/ArtifactFiltersComponent'

const useStyles = makeStyles(theme => ({
  landing: {
    display: 'flex',
    height: 'calc(100vh - 90px)',
    width: '99%',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  container: {
    padding: '20px'
  },
  text: {
    color: 'white',
    fontSize: '12px',
    padding: '10px 0'
  },
  attributes: {
    position: 'fixed',
    right: 0
  },
  filterContainer: {
    backgroundColor: 'rgb(70, 78, 96)',
    padding: '10px',
    width: '100%',
    position: 'fixed',
    left: '0',
    bottom: '0',
    zIndex: 4
  },
  phantomDiv: {
    display: 'block',
    height: '20px',
    width: '100%'
  }
}))

const Artifacts = ({
  artifacts,
  artifactImages,
  artifactStats,
  bEnterHell,
  handleBEnterHellTrue
}) => {
  const classes = useStyles()

  const [currentArtifact, setCurrentArtifact] = useState({})

  // FILTER STATE VARIABLES
  const [filterSlots, setFilterSlots] = useState(null)
  const handleFilterSlotsChange = value => {
    setFilterSlots(value)
    setCurrentArtifact({})
  }

  const [filterSet, setFilterSet] = useState('')
  const handleFilterSet = event => {
    setFilterSet(event.target.value)
    setCurrentArtifact({})
  }

  const [filterPrimaryStat, setFilterPrimaryStat] = useState('')
  const handleFilterPrimaryStatChange = event => {
    setFilterPrimaryStat(event.target.value)
    setCurrentArtifact({})
  }

  const [filterSecondaryStats, setFilterSecondaryStats] = useState([])
  const handleFilterSecondaryStatsChange = event => {
    setFilterSecondaryStats(event.target.value)
    setCurrentArtifact({})
  }

  // Consolidated filter function; accounts for all fields
  const filterHandler = artifact => {
    return (
      (!filterSlots || filterSlots === artifact.Slot) &&
      (filterSet === '' || filterSet === artifact.Set) &&
      (filterPrimaryStat === 'Filter by Primary' ||
        primaryStatFilter(artifact)) &&
      (filterSecondaryStats.length === 0 || secondaryStatFilter(artifact))
    )
  }

  const primaryStatFilter = artifact => {
    if (['HP', 'ATK'].includes(filterPrimaryStat)) {
      return (
        artifact['Primary Stat'].includes(filterPrimaryStat) &&
        !artifact['Primary Stat'].includes('%')
      )
    } else if (['HP%', 'ATK%', 'DEF%'].includes(filterPrimaryStat)) {
      return (
        artifact['Primary Stat'].includes(filterPrimaryStat.slice(0, -1)) &&
        artifact['Primary Stat'].includes('%')
      )
    } else {
      return artifact['Primary Stat'].includes(filterPrimaryStat)
    }
  }

  const getSecondaryStatLabel = raw => {
    return raw
      .split(' ')
      .slice(0, -1)
      .join(' ')
  }

  // Separating this into another function due to having to check four different fields for the same thing
  const secondaryStatFilter = artifact => {
    return filterSecondaryStats.every(stat => {
      // Inefficient as hell
      if (['HP', 'ATK', 'DEF'].includes(stat)) {
        return (
          (stat.includes(getSecondaryStatLabel(artifact['Secondary Stat 1'])) &&
            !artifact['Secondary Stat 1'].includes('%')) ||
          (artifact['Secondary Stat 2'] &&
            stat.includes(
              getSecondaryStatLabel(artifact['Secondary Stat 2'])
            ) &&
            !artifact['Secondary Stat 2'].includes('%')) ||
          (artifact['Secondary Stat 3'] &&
            stat.includes(
              getSecondaryStatLabel(artifact['Secondary Stat 3'])
            ) &&
            !artifact['Secondary Stat 3'].includes('%')) ||
          (artifact['Secondary Stat 4'] &&
            stat.includes(
              getSecondaryStatLabel(artifact['Secondary Stat 4'])
            ) &&
            !artifact['Secondary Stat 4'].includes('%'))
        )
      } else if (['HP%', 'ATK%', 'DEF%'].includes(stat)) {
        return (
          artifact['Secondary Stat 1'].includes(
            stat.slice(0, -1) && artifact['Secondary Stat 1'].includes('%')
          ) ||
          (artifact['Secondary Stat 2'] &&
            artifact['Secondary Stat 2'].includes(stat.slice(0, -1)) &&
            artifact['Secondary Stat 2'].includes('%')) ||
          (artifact['Secondary Stat 3'] &&
            artifact['Secondary Stat 3'].includes(stat.slice(0, -1)) &&
            artifact['Secondary Stat 3'].includes('%')) ||
          (artifact['Secondary Stat 4'] &&
            artifact['Secondary Stat 4'].includes(stat.slice(0, -1)) &&
            artifact['Secondary Stat 4'].includes('%'))
        )
      } else {
        return (
          stat.includes(getSecondaryStatLabel(artifact['Secondary Stat 1'])) ||
          (artifact['Secondary Stat 2'] &&
            stat.includes(
              getSecondaryStatLabel(artifact['Secondary Stat 2'])
            )) ||
          (artifact['Secondary Stat 3'] &&
            stat.includes(
              getSecondaryStatLabel(artifact['Secondary Stat 3'])
            )) ||
          (artifact['Secondary Stat 4'] &&
            stat.includes(getSecondaryStatLabel(artifact['Secondary Stat 4'])))
        )
      }
    })
  }

  return (
    <>
      {!bEnterHell ? (
        <div className={classes.landing}>
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
            spacing={1}
          >
            <Grid item>
              <Typography>Do you wish to enter artifact hell?</Typography>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                onClick={handleBEnterHellTrue}
              >
                Yes
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='secondary'
                onClick={handleBEnterHellTrue}
              >
                Yes but in red
              </Button>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div className={classes.container}>
          <Typography className={classes.text}>
            Only includes my four star, three-line artifacts and up (except for one bad
            Barbara piece).
          </Typography>
          <Grid container>
            <Grid container item xs={8} spacing={2} alignItems='center'>
              {artifacts.map &&
                artifacts
                  .filter(artifact => {
                    return filterHandler(artifact)
                  })
                  .map((artifact, value) => {
                    const image =
                      artifactImages.find &&
                      artifactImages.find(row => {
                        return row.Name === artifact.Name
                      })

                    return (
                      <Grid
                        item
                        container
                        xs={4}
                        sm={2}
                        key={artifact.Name + artifact.Character + value}
                        justify='center'
                        alignItems='center'
                      >
                        <div
                          onClick={() => {
                            setCurrentArtifact(artifact)
                          }}
                        >
                          <ArtifactComponent
                            artifact={artifact}
                            currentArtifact={currentArtifact}
                            artifactImage={image}
                          />
                        </div>
                      </Grid>
                    )
                  })}
            </Grid>
            <Grid container item xs={4} className={classes.attributes}>
              <ArtifactAttributesComponent
                artifact={currentArtifact}
                artifactImage={
                  artifactImages.find &&
                  artifactImages.find(row => {
                    return row.Name === currentArtifact.Name
                  })
                }
                bMainPage={true}
              />
            </Grid>
          </Grid>
          <div className={classes.phantomDiv}></div>
          <div className={classes.filterContainer}>
            <Grid container xs={12}>
              <ArtifactFiltersComponent
                artifacts={artifacts}
                artifactStats={artifactStats}
                filterSlots={filterSlots}
                handleFilterSlotsChange={handleFilterSlotsChange}
                filterSet={filterSet}
                handleFilterSet={handleFilterSet}
                filterPrimaryStat={filterPrimaryStat}
                handleFilterPrimaryStatChange={handleFilterPrimaryStatChange}
                filterSecondaryStats={filterSecondaryStats}
                handleFilterSecondaryStatsChange={
                  handleFilterSecondaryStatsChange
                }
              />
            </Grid>
          </div>
        </div>
      )}
    </>
  )
}

export default Artifacts
