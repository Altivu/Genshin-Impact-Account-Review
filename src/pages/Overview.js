import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import {
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  container: {
    padding: '20px',
    color: 'white',
    '& *': {
      color: 'white'
    }
  }
}))

const Overview = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Typography variant='h5'>Objectives</Typography>
      <ul>
        <li>
          Consistently clear any and all domains in a reasonable amount of time
          (cannot reliably complete most of the artifact domains, and co-op is
          dubious)
          <ul>
            <li>
              For reference, it takes me over three minutes to complete the
              Noblesse/Bloodstained domain, and about 4:30 and a bunch of food
              to complete the Maiden/Viridescent domain. I can't complete the
              other ones
            </li>
          </ul>
        </li>
        <li>
          Put serious effort into tackling Spiral Abyss for the rewards
          <ul>
            <il>
              I am aware my account as is would probably be unable to clear
              Floor 12 (let alone reach it), but some perspective on how far I
              can potentially take this would be nice
            </il>
          </ul>
        </li>
      </ul>
      <br />
      <Typography variant='h5'>General Info</Typography>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Adventure Rank</TableCell>
              <TableCell>47</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>$$$ Status</TableCell>
              <TableCell>
                <ul>
                  <li>Blessing of the Welkin Moon x1</li>
                  <li>Gnostic Hymn x1</li>
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Resin Efficiency</TableCell>
              <TableCell>
                Generally use my resin before it completely fills. Mostly run
                random domains although more recently I've been farming Oceanid.
                I have not done any resin refreshes nor used any fragile resin.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Furthest Abyss Clear</TableCell>
              <TableCell>9-1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
      <Typography variant='h5'>Secondary Info</Typography>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Wishes Used</TableCell>
              <TableCell>
                <ul>
                  <li>Novice Wishes x20</li>
                  <li>Character Event Wish x81</li>
                  <li>Weapon Event Wish x0</li>
                  <li>Permanent Wish x0</li>
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Platform</TableCell>
              <TableCell>Mobile (~15-30 FPS on lowest settings)</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Overview
