import React from 'react'
import './App.css'
import { Button } from '@mui/material'
import CreateTreeForm from './components/CreateTreeForm/CreateTreeForm'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Map } from './components/Map/Map'
import { useJsApiLoader } from '@react-google-maps/api'

const API_KEY = process.env.REACT_APP_API_KEY

const center = {
  lat: 49.23244,
  lng: 28.484131,
}

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false
}

const libraries: [
  'places' | 'drawing' | 'geometry' | 'localContext' | 'visualization'
] = ['places']

function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY ?? '',
    libraries,
  })

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        dark: '#9EB23B',
        main: '#C7D36F',
        light: '#FCF9C6',
      },
    },
  })

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <ThemeProvider theme={theme}>
      {isLoaded ? <Map center={center} /> : <h2>Loading...</h2>}

      <div className="App">
        <h1>Hello we are 4 vesla</h1>

        <div>
          <Button
            color={'primary'}
            variant="outlined"
            onClick={handleClickOpen}
          >
            Open simple dialog
          </Button>
          <CreateTreeForm open={open} onClose={handleClose} />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
