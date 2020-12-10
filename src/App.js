import { useState, useLayoutEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import './index.css'

import { Toolbar } from '@material-ui/core'

import XLSX from 'xlsx'
import excelData from './assets/files/Genshin Impact Account Review.xlsx'

import Navbar from './components/Navbar'

import Home from './pages/Home'
import Overview from './pages/Overview'
import Characters from './pages/Characters'
import Weapons from './pages/Weapons'
import Artifacts from './pages/Artifacts'

// Google Analytics and Tracking Pageviews
import ReactGA from 'react-ga'
ReactGA.initialize('UA-109333610-2')
ReactGA.pageview(window.location.pathname + window.location.search)

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#303030'
    }
  },
  typography: {
    fontFamily: ['HYWenHei-85W', 'Roboto', 'san-serif'].join(',')
  }
})

function App () {
  const [characters, setCharacters] = useState({})
  const [weapons, setWeapons] = useState({})
  const [artifacts, setArtifacts] = useState({})
  const [artifactImages, setArtifactImages] = useState({})
  const [artifactStats, setArtifactStats] = useState({})

  const [bEnterHell, setBEnterHell] = useState(false)
  const handleBEnterHellTrue = () => {
    setBEnterHell(true)
  }

  useLayoutEffect(() => {
    fetch(excelData)
      .then(res => res.arrayBuffer())
      .then(ab => {
        const wb = XLSX.read(ab, { type: 'array' })

        setCharacters(XLSX.utils.sheet_to_json(wb.Sheets['Characters']))
        setWeapons(XLSX.utils.sheet_to_json(wb.Sheets['Weapons']))
        setArtifacts(XLSX.utils.sheet_to_json(wb.Sheets['Artifacts']))
        setArtifactImages(
          XLSX.utils.sheet_to_json(wb.Sheets['Artifact Image Map'])
        )
        setArtifactStats(XLSX.utils.sheet_to_json(wb.Sheets['Artifact Stats']))
      })
      .catch(() => {})
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename='/Genshin-Impact-Account-Review'>
        <Navbar />
        <Toolbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/overview' render={props => <Overview {...props} />} />
          <Route
            path='/characters'
            render={props => (
              <Characters
                {...props}
                characters={characters}
                weapons={weapons}
                artifacts={artifacts}
                artifactImages={artifactImages}
                artifactStats={artifactStats}
              />
            )}
          />
          <Route
            path='/weapons'
            render={props => <Weapons {...props} weapons={weapons} />}
          />
          <Route
            path='/artifacts'
            render={props => (
              <Artifacts
                {...props}
                artifacts={artifacts}
                artifactImages={artifactImages}
                artifactStats={artifactStats}
                bEnterHell={bEnterHell}
                handleBEnterHellTrue={handleBEnterHellTrue}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
