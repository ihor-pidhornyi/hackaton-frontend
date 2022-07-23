import { GoogleMap, Marker } from '@react-google-maps/api'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CloseButton, Container, CreateTree } from './Map.styled'
import { Coordinates } from '../../shared/models/coordinates'
import { defaultTheme } from './Theme'
import { MapsAutocomplete } from '../MapsAutocomplete/MapsAutocomplete'
import { useNavigate } from 'react-router-dom'
import { Button, debounce } from '@mui/material'

const containerStyle = {
  width: '100%',
  height: '100%',
}

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollWheel: false,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
  styles: defaultTheme,
}

export const Map = () => {
  const mapRef = useRef<google.maps.Map | undefined>(undefined)
  const [createTreeLatLng, setCreateTreeLatLng] =
    useState<google.maps.LatLng | null>(null)
  const [clickXY, setClickXY] = useState<{ x: number; y: number } | null>(null)
  const [zoom, setZoom] = useState<number>(15)
  const [markers, setMarkers] = useState<Coordinates[]>([])
  const [center, setCenter] = useState<Coordinates>({
    lat: 49.233083,
    lng: 28.468217,
  })
  const navigate = useNavigate()

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    mapRef.current = map
  }, [])

  const onUnmount = useCallback(function callback() {
    mapRef.current = undefined
  }, [])

  const onClick = useCallback(
    function callback(event: google.maps.MapMouseEvent) {
      setCreateTreeLatLng(event.latLng)
      console.log()
      if ('screenX' in event.domEvent) {
        setClickXY({ x: event.domEvent.screenX, y: event.domEvent.screenY })
      }
      const coordinates = event.latLng?.toJSON()
      coordinates && setMarkers([...markers, coordinates])
    },
    [markers, setMarkers]
  )

  const onDebounce = useMemo(
    () =>
      debounce((callback) => {
        callback()
      }, 500),
    []
  )

  const onValueChanges = useCallback(
    function callback(value: Coordinates) {
      setCenter(value)
    },
    [setCenter]
  )

  const onZoomChanged = useCallback(
    function callback() {
      if (mapRef.current) {
        onDebounce(() => {
          const zoom = mapRef.current?.getZoom()
          zoom && setZoom(zoom)
        })
      }
    },
    [onDebounce]
  )

  const onBoundsChanged = useCallback(
    function callback() {
      if (mapRef.current) {
        onDebounce(() => {
          console.log(mapRef.current?.getBounds()?.toJSON())
        })
      }
    },
    [onDebounce]
  )

  const openCreateTree = useCallback(
    function callback() {
      console.log(createTreeLatLng)
    },
    [createTreeLatLng]
  )

  useEffect(() => {
    navigate('/' + center.lat + ',' + center.lng)
    setClickXY(null)
    setCreateTreeLatLng(null)
  }, [center, navigate])

  return (
    <Container>
      {clickXY && (
        <CreateTree x={clickXY.x} y={clickXY.y}>
          <Button variant={'contained'} onClick={openCreateTree}>
            Додати дерево
          </Button>
          <Button
            sx={{
              marginLeft: '.5rem',
              height: '40px',
              display: 'inline-block'
            }}
            endIcon={<CloseButton />}
            onClick={() => {
              setClickXY(null)
              setCreateTreeLatLng(null)
            }}
          />
        </CreateTree>
      )}

      <GoogleMap
        mapContainerStyle={containerStyle}
        options={defaultOptions}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onClick}
        onZoomChanged={onZoomChanged}
        onBoundsChanged={onBoundsChanged}
      >
        <MapsAutocomplete valueChanges={onValueChanges} />

        {createTreeLatLng && <Marker position={createTreeLatLng.toJSON()} />}

        {/*{markers.length && (*/}
        {/*  <>*/}
        {/*    {markers.map((coordinates, index) => (*/}
        {/*      <Circle key={index} center={coordinates} radius={5} />*/}
        {/*    ))}*/}
        {/*  </>*/}
        {/*)}*/}
      </GoogleMap>
    </Container>
  )
}
