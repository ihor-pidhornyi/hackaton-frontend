import React from 'react'
import { Button } from '@mui/material'
import CreateTreeForm from '../../components/CreateTreeForm/CreateTreeForm'
import { Map } from '../../components/Map/Map'
import { useJsApiLoader } from '@react-google-maps/api'
import { useParams } from 'react-router-dom'
import SideBar from '../../components/SideBar/SideBar'
import { Coordinates } from '../../shared/models/coordinates'

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

  const [coords, setCoords] = React.useState<Coordinates | undefined>(undefined)
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = (coordinates?: Coordinates) => {
    if (coordinates) {
      setOpen(true)
      setCoords(coordinates)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <SideBar />
      {isLoaded ? (
        <Map handleCreateTree={handleClickOpen} />
      ) : (
        <h2>Loading...</h2>
      )}

      <div className="App">
        <div>
          {coords && <CreateTreeForm coords={coords} open={open} onClose={handleClose} />}
        </div>
      </div>
    </div>
  )
}
