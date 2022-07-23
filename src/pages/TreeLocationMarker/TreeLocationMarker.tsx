import {Coordinates} from "../../shared/models/coordinates";
import {Marker} from "@react-google-maps/api";
import {Container} from "./TreeLocationMarker.styled";

export const TreeLocationMarker = ({ position, radius }: { position: Coordinates, radius: number }) => {
    return <Container><Marker position={position} icon={''} shape={{type: 'circle', coords: [position.lng, position.lat] }} /></Container>
}
