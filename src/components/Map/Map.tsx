import { GoogleMap } from '@react-google-maps/api'
import { useCallback, useRef } from 'react'
import { Container } from './Map.styled'
import { Coordinates } from '../../shared/models/coordinates'
import { defaultTheme } from './Theme'
import { MapsAutocomplete } from '../MapsAutocomplete/MapsAutocomplete'

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

export const Map = ({ center }: { center: Coordinates }) => {
  const mapRef = useRef<unknown | undefined>(undefined)

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
  },
  [])

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
      >
        <MapsAutocomplete />
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </Container>
  )
}
