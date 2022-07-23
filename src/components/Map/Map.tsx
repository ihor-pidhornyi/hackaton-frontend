import {GoogleMap} from '@react-google-maps/api'
import {useCallback, useRef} from 'react'
import {Container} from "./Map.styled"

const containerStyle = {
    width: '100%',
    height: '100%',
}

export const Map = ({center}: { center: { lat: number, lng: number } }) => {

    const mapRef = useRef<unknown | undefined>(undefined)

    const onLoad = useCallback(function callback(map: unknown) {
        mapRef.current = map
    }, [])

    const onUnmount = useCallback(function callback(map: unknown) {
        mapRef.current = undefined
    }, [])

    return (
        <Container><GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                { /* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
        </Container>
    )
}
