import { makeStyles } from '@material-ui/core/styles'
import React, { useState, useEffect } from 'react'

import {
  Checkbox,
  FormControl,
  Grid,
  // IconButton,
  Input,
  ListItemText,
  MenuItem,
  Select
} from '@material-ui/core'
import { ArrowDropUp } from '@material-ui/icons'

// import Flower from '../assets/images/Artifact Icons/Icon_Flower_of_Life.webp'
// import Plume from '../assets/images/Artifact Icons/Icon_Plume_of_Death.webp'
// import Sands from '../assets/images/Artifact Icons/Icon_Sands_of_Eon.webp'
// import Goblet from '../assets/images/Artifact Icons/Icon_Goblet_of_Eonothem.webp'
// import Circlet from '../assets/images/Artifact Icons/Icon_Circlet_of_Logos.webp'

const useStyles = makeStyles(theme => ({
  box: {
    backgroundColor: 'grey'
  },
  // iconsContainer: {
  //   '& img': {
  //     width: '30px',
  //     height: '30px'
  //   }
  // },
  // artifactIcon: {
  //   filter: filterSlots => {
  //     return 'invert(100%)'
  //   }
  // },
  filterField: {
    width: '200px',
    backgroundColor: 'rgb(237, 229, 216)',
    borderRadius: '20px',
    paddingLeft: '10px',
    fontSize: '10px'
  },
  filterMenuBox: {
    backgroundColor: 'rgb(237, 229, 216)'
  },
  filterMenuText: {
    fontSize: '10px'
  }
}))

// Not going to use this due to lack of space (streamer seems to look at these with reduced window width)
// const ArtifactIcon = ({
//   name,
//   image,
//   filterSlots,
//   handleFilterSlotsChange
// }) => {
//   const classes = useStyles({ filterSlots })

//   return (
//     <IconButton
//       onClick={e => {
//         handleFilterSlotsChange(name)
//       }}
//     >
//       <img
//         src={image}
//         alt={name.split(' ')[1]}
//         value={name}
//         class={classes.artifactIcon}
//       />
//     </IconButton>
//   )
// }

const ArtifactFiltersComponent = props => {
  const classes = useStyles()

  const [setList, setSetList] = useState('')

  const [primaryList, setPrimaryList] = useState([])
  const [secondaryList, setSecondaryList] = useState([])

  useEffect(() => {
    if (props.artifacts && props.artifacts.reduce) {
      setSetList(
        props.artifacts.reduce((acc, o) => {
          acc[o.Set] = (acc[o.Set] || 0) + 1
          return acc
        }, {})
      )

      if (props.artifactStats.reduce) {
        setPrimaryList(
          props.artifactStats.reduce((acc, o) => {
            if (o['Primary Stat']) {
              acc.push(o['Primary Stat'])
            }

            return acc
          }, [])
        )

        setSecondaryList(
          props.artifactStats.reduce((acc, o) => {
            if (o['Secondary Stat']) {
              acc.push(o['Secondary Stat'])
            }

            return acc
          }, [])
        )
      }
    }
  }, [props.artifacts, props.artifactStats])

  return (
    <Grid container alignItems='center'>
      {/* <Grid item container xs={4} direction='row'>
          <div className={classes.iconsContainer}>
            <ArtifactIcon
              name='1. Flower of Life'
              image={Flower}
              filterSlots={props.filterSlots}
              handleFilterSlotsChange={props.handleFilterSlotsChange}
            />
            <ArtifactIcon
              name='2. Plume of Death'
              image={Plume}
              filterSlots={props.filterSlots}
              handleFilterSlotsChange={props.handleFilterSlotsChange}
            />
            <ArtifactIcon
              name='3. Sands of Eon'
              image={Sands}
              filterSlots={props.filterSlots}
              handleFilterSlotsChange={props.handleFilterSlotsChange}
            />
            <ArtifactIcon
              name='4. Goblet of Eonothem'
              image={Goblet}
              filterSlots={props.filterSlots}
              handleFilterSlotsChange={props.handleFilterSlotsChange}
            />
            <ArtifactIcon
              name='5. Circlet of Logos'
              image={Circlet}
              filterSlots={props.filterSlots}
              handleFilterSlotsChange={props.handleFilterSlotsChange}
            />
          </div>
        </Grid> */}

      <Grid item container xs={4}>
        <FormControl>
          <Select
            displayEmpty
            value={props.filterSet}
            onChange={props.handleFilterSet}
            margin='dense'
            disableUnderline
            input={<Input />}
            renderValue={selected => {
              if (selected === '') {
                return 'Filter by Set'
              }
              return selected
            }}
            MenuProps={{ classes: { paper: classes.filterMenuBox } }}
            className={classes.filterField}
            IconComponent={ArrowDropUp}
          >
            <MenuItem key='All' value=''>
              <ListItemText
                primary={`All (${props.artifacts.length})`}
                classes={{ primary: classes.filterMenuText }}
              />
            </MenuItem>
            {Object.entries(setList)
              .sort((a, b) => {
                return b < a
              })
              .map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  <ListItemText
                    primary={`${key} (${value})`}
                    classes={{ primary: classes.filterMenuText }}
                  />
                </MenuItem>
              ))}{' '}
          </Select>
        </FormControl>
      </Grid>

      <Grid item container xs={4}>
        <FormControl>
          <Select
            displayEmpty
            value={props.filterPrimaryStat}
            onChange={props.handleFilterPrimaryStatChange}
            margin='dense'
            disableUnderline
            input={<Input />}
            renderValue={selected => {
              if (selected === '') {
                return 'Filter by Primary'
              }
              return selected
            }}
            MenuProps={{ classes: { paper: classes.filterMenuBox } }}
            className={classes.filterField}
            IconComponent={ArrowDropUp}
          >
            <MenuItem key='Any' value=''>
              <ListItemText
                primary='All'
                classes={{ primary: classes.filterMenuText }}
              />
            </MenuItem>
            {primaryList.map(stat => (
              <MenuItem key={stat} value={stat}>
                <ListItemText
                  primary={stat}
                  classes={{ primary: classes.filterMenuText }}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item container xs={4}>
        <FormControl>
          <Select
            multiple
            displayEmpty
            value={props.filterSecondaryStats}
            onChange={props.handleFilterSecondaryStatsChange}
            margin='dense'
            disableUnderline
            input={<Input />}
            renderValue={selected => {
              if (selected.length === 0) {
                return 'Filter by Secondary'
              }
              return selected.join(', ')
            }}
            MenuProps={{ classes: { paper: classes.filterMenuBox } }}
            className={classes.filterField}
            IconComponent={ArrowDropUp}
          >
            {secondaryList.map(stat => (
              <MenuItem key={stat} value={stat}>
                <Checkbox
                  checked={props.filterSecondaryStats.indexOf(stat) > -1}
                />
                <ListItemText
                  primary={stat}
                  classes={{ primary: classes.filterMenuText }}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default ArtifactFiltersComponent
