import { MapContainer, TileLayer, Popup, Marker, useMap } from "react-leaflet";
import { useMapEvents } from 'react-leaflet/hooks'
import "leaflet/dist/leaflet.css"
import { useEffect, useRef, useState } from "react";
import PrimaryButton from "../ui/Button";
import { useStoreData } from "../../global/store";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function GetUserLocation({ setClickedPosition, handleLocation = null }) {
    const map = useMapEvents({
        click: () => {
            map.locate()
        },
        locationfound: (location) => {
            setClickedPosition({ latitude: location.latlng.lat, longitude: location.latlng.lng })
            map.flyTo(location.latlng, map.getZoom())
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
    zoomIn = false,
    zoomCenter = null

}) => {
    const { store, setStoreData } = useStoreData()
    const navigate = useNavigate()
    const [clickedPosition, setClickedPosition] = useState({
        longitude: -0.09,
        latitude: 51.505,
    });
    const mapRef = useRef()
    const handleMarkerDrag = (e) => {
        setClickedPosition({ latitude: e.target._latlng.lat, longitude: e.target._latlng.lng });
        if (handleLocation) handleLocation(e.target._latlng.lat, e.target._latlng.lng)
    };

    useEffect(()=>{
        if (store.receiver_id) navigate("/manager/chats")
    }, [store.receiver_id])

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.flyTo(zoomCenter, 13)
        }
    }, [zoomCenter])

    return (
        <MapContainer
            center={zoomCenter ? zoomCenter : [34, 36]}
            zoom={8}
            className={`${styles ? styles : "h-[100vh] w-full"}`}
            ref={mapRef}
        >

            {locateUser ?
                <GetUserLocation setClickedPosition={setClickedPosition} handleLocation={handleLocation} zoomIn={zoomIn} zoomTo={zoomCenter} />

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
                            <Popup >
                                <div className="w-[80%] h-[120px] flex flex-col justify-between items-center mr-5">
                                    <span className="mt-3 text-[16px]">{marker.company_name}</span>
                                    <Button
                                        size="sm"
                                        variant="text"
                                        className="flex items-center gap-2 w-fit text-[14px] px-5 mt-2"
                                        onClick={() => {
                                            setStoreData({...store, receiver_id: marker.charity_id})
                                        }}
                                    >
                                        Open Chat
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="h-4 w-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                            />
                                        </svg>
                                    </Button>
                                </div>

                            </Popup>
                        </Marker>
                    ))
                    : null
            }

        </MapContainer>
    )
}

export default Map