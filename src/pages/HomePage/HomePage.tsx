import React, { useCallback } from 'react'
import CreateTreeForm from '../../components/CreateTreeForm/CreateTreeForm'
import { Map } from '../../components/Map/Map'
import { useJsApiLoader } from '@react-google-maps/api'
import { useParams } from 'react-router-dom'
import SideBar from '../../components/SideBar/SideBar'
import { Coordinates } from '../../shared/models/coordinates'
import { libraries } from '../../shared/consts/google-maps-libraries'
import { useGlobalContext } from '../../shared/context/GlobalContext'
import { TreeShortModal } from '../../components/TreeShortModal/TreeShortModal'

const API_KEY = process.env.REACT_APP_API_KEY

export default function HomePage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY ?? '',
    libraries,
  })

  const params = useParams()

  const [coords, setCoords] = React.useState<Coordinates | undefined>(undefined)
  const [openCreate, setOpenCreate] = React.useState(false)
  const { selectedTree, setSelectedTree, setTrees } = useGlobalContext()

  const handleClickOpen = useCallback(
    (coordinates?: Coordinates) => {
      if (coordinates) {
        setOpenCreate(true)
        setCoords(coordinates)
      }
    },
    [setOpenCreate, setCoords]
  )

  const handleClose = useCallback((refetch: boolean) => {
    setOpenCreate(false)
    setCoords(undefined)
  }, [setCoords, setOpenCreate])

  const handleCloseTree = useCallback(() => {
    setSelectedTree(null)
  }, [setSelectedTree])

  return (
    <div>
      <SideBar />
      {isLoaded ? (
        <Map handleCreateTree={handleClickOpen} />
      ) : (
        <h2>Loading...</h2>
      )}

      <div>
        {coords && (
          <CreateTreeForm
            coords={coords}
            open={openCreate}
            onClose={(refetch: boolean) => handleClose(refetch)}
          />
        )}

        {selectedTree && (
          <TreeShortModal
            tree={selectedTree}
            open={!!selectedTree}
            close={handleCloseTree}
          />
        )}
      </div>
    </div>
  )
}
