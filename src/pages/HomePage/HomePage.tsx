import React from 'react'
import { Button } from '@mui/material'
import CreateTreeForm from '../../components/CreateTreeForm/CreateTreeForm'
import { Map } from '../../components/Map/Map'
import { useJsApiLoader } from '@react-google-maps/api'
import { useParams } from 'react-router-dom'
import SideBar from '../../components/SideBar/SideBar'

const API_KEY = process.env.REACT_APP_API_KEY

const libraries: [
  'places' | 'drawing' | 'geometry' | 'localContext' | 'visualization'
] = ['places']

export default function HomePage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY ?? '',
    libraries,
  })

  const params = useParams()

  console.log('params', params)

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <SideBar />
      {isLoaded ? <Map /> : <h2>Loading...</h2>}

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
    </div>
  )
}
