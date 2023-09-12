import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css"
import { Icon } from "leaflet";
const Map = () => {

    const myMarker = new Icon({
        iconUrl: "https://img.icons8.com/?size=512&id=PZTTDl8ML4vy&format=png",
        iconSize: [38, 38]
    })
    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            className="h-[100vh] w-full"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[13, 50]} icon={myMarker} >
                <Popup className="map-popup">
                    dsad<br />dasdsa
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map