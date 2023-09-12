import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { useMapEvents } from 'react-leaflet/hooks'
import "leaflet/dist/leaflet.css"
import { useState } from "react";

function GetUserLocation({ setClickedPosition, handleLocation = null }) {
    const map = useMapEvents({
        click: () => {
            map.locate()
        },
        locationfound: (location) => {
            setClickedPosition({ latitude: location.latlng.lat, longitude: location.latlng.lng })
            if (handleLocation) handleLocation(location.latlng.lat, location.latlng.lng)
        },
    })
    return null
}

const Map = ({
    styles = null,
    locateUser = null,
    draggable = false,
    showMarkers = null,
    handleLocation = null,

}) => {
    const [clickedPosition, setClickedPosition] = useState({
        longitude: -0.09,
        latitude: 51.505,
    });
    const handleMarkerDrag = (e) => {
        setClickedPosition({ latitude: e.target._latlng.lat, longitude: e.target._latlng.lng });
        if (handleLocation) handleLocation(e.target._latlng.lat, e.target._latlng.lng)
    };


    return (
        <MapContainer
            center={[34, 36]}
            zoom={8}
            className={`${styles ? styles : "h-[100vh] w-full"}`}
        >
            {locateUser ?
                <GetUserLocation setClickedPosition={setClickedPosition} handleLocation={handleLocation} />
                : null
            }
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locateUser ?
                <Marker position={[clickedPosition.latitude, clickedPosition.longitude]} draggable={draggable ? draggable : false}
                    eventHandlers={{ dragend: handleMarkerDrag }}
                >
                </Marker>
                : null
            }

            {
                showMarkers ?
                    showMarkers.map((marker) => (
                        <Marker position={[marker.latitude, marker.longitude]} key={marker.id} draggable={false}>
                            <Popup>
                                {marker.company_name}
                            </Popup>
                        </Marker>
                    ))
                    : null
            }

        </MapContainer>
    )
}

export default Map