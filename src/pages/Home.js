import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import {
  Typography,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme => ({
  container: {
    padding: '20px',
    color: 'white'
  },
  grid: {
    paddingTop: '10px'
  },
  accordion: {
    backgroundColor: 'grey'
  },
  list: {
    width: '400px'
  },
  listIcon: {
    paddingRight: '10px'
  }
}))

const checkList = [
  {
    text: 'Hydrate',
    icon: 'https://cdn.betterttv.net/emote/5ab69a420f8d421b694d16a4/2x',
    alt: 'KannaSippy'
  },
  {
    text: 'Take a dump',
    icon: 'https://cdn.betterttv.net/emote/5c268a6b073d667de5c94ceb/2x',
    alt: 'PeepoT'
  },
  {
    text: 'Celebrate your birthday',
    icon: 'https://cdn.betterttv.net/emote/5b15000947c7bf3bfc0b9bed/2x',
    alt: 'FeelsBirthdayHop'
  },
  {
    text: 'Be fat',
    icon: 'https://cdn.betterttv.net/emote/5f676859d7160803d895cd21/2x',
    alt: 'PeepoFat'
  },
  {
    text: 'Vibe',
    icon: 'https://cdn.betterttv.net/emote/5b444de56b9160327d12534a/2x',
    alt: 'PepeDS'
  },
  {
    text: 'Vibe a lot',
    icon: 'https://cdn.betterttv.net/emote/5b3e953a2c8a38720760c7f7/2x',
    alt: 'ppOverheat'
  },
  {
    text: 'Get garbage artifacts',
    icon: 'https://cdn.betterttv.net/emote/5ee7dc82f54be95e2a851b3b/2x',
    alt: 'SadgeInTheRain'
  },
  {
    text: 'Assault your microphone',
    icon: 'https://cdn.betterttv.net/emote/5ce66e8c1281d44f03de8051/2x',
    alt: 'gachiW'
  }
]

const Home = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Typography variant='h6'>
        Hello Mr. <strike>Stripper</strike> Strimmer,
      </Typography>
      <Typography variant='body2'>
        Go through the links at the top right in order to get a rough idea of my
        account progression and what I am hoping to get out of this review. Note
        that some pages will take a bit longer to load due to lots of images
        (nothing naughty, sorry chat).
        <br />
        <br />
        Before we begin though, let's go over the daily checklist...
        <br />
      </Typography>
      <Grid container justify='center' className={classes.grid}>
        <Grid item>
          <Accordion className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel-content'
              id='panel-header'
            >
              <Typography className={classes.heading}>
                Daily Checklist
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List className={classes.list}>
                {checkList.map(item => {
                  return (
                    <ListItem dense>
                      <ListItemAvatar>
                        <img
                          src={item.icon}
                          alt={item.alt}
                          className={classes.listIcon}
                        />
                      </ListItemAvatar>
                      <ListItemText id={item.text} primary={item.text} />
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge='end'
                          inputProps={{ 'aria-labelledby': item.text }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                })}
              </List>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home
