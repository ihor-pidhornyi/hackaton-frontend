import { GoogleMap, InfoBox, Marker } from '@react-google-maps/api'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Container } from './Map.styled'
import { Coordinates } from '../../shared/models/coordinates'
import { defaultTheme } from './Theme'
import { MapsAutocomplete } from '../MapsAutocomplete/MapsAutocomplete'
import { useNavigate } from 'react-router-dom'
import { debounce } from '@mui/material'
import { HomeIcon } from '../Header/Header.styled'

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
  const [clickCoordinates, setClickCoordinates] =
    useState<google.maps.LatLng | null>(null)
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

  const onClick = useCallback(function callback(
    event: google.maps.MapMouseEvent
  ) {
    console.log(event.latLng?.toJSON())
    setClickCoordinates(event.latLng)
  },
  [])

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

  const onZoomChanged = useCallback(function callback() {
    if (mapRef.current) {
      onDebounce(() => {
        console.log('wtf 1')
      })
    }
  }, [])

  const onBoundsChanged = useCallback(function callback() {
    if (mapRef.current) {
      onDebounce(() => {
        console.log('wtf 2')
      })
    }
  }, [])

  useEffect(() => {
    navigate('/' + center.lat + ',' + center.lng)
  }, [center])

  return (
    <Container>
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={defaultOptions}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onClick}
        onZoomChanged={onZoomChanged}
        onBoundsChanged={onBoundsChanged}
      >
        <MapsAutocomplete valueChanges={onValueChanges} />
        {/* Child components, such as markers, info windows, etc. */}
        {clickCoordinates && (
          <InfoBox
            // options={{
            //   boxStyle: {
            //     img: {
            //       display: 'none !important',
            //     },
            //   },
            // }}
            position={clickCoordinates}
          >
            <button
              onClick={(event) => {
                event.stopPropagation()
              }}
            >
              Додати дерево
            </button>
          </InfoBox>
        )}
      </GoogleMap>
    </Container>
  )
}
