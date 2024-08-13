import { useCallback, useEffect, useRef, useState } from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Circle } from "./Circle.jsx";
import ModalCard from "./ModalCard.jsx";

const center = {
  lat: -27.33056,
  lng: -55.86667,
};

const MapComponent = ({ locations = [] }) => {
  console.log(locations);
  return (
    <div className="absolute inset-0 z-0">
      <APIProvider
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <Map
          defaultZoom={13}
          defaultCenter={center}
          options={{
            mapTypeControl: false, // Disable map type (map/satellite) control
            streetViewControl: false, // Disable street view control
            fullscreenControl: false, // Disable fullscreen control
            zoomControl: true, // Optionally, disable zoom control by setting this to false
          }}
          onCameraChanged={(ev) =>
            console.debug(
              "camera changed:",
              ev.detail.center,
              "zoom:",
              ev.detail.zoom
            )
          }
          mapId="da37f3254c6a6d1c"
        >
          <PoiMarkers locations={locations} />
        </Map>
      </APIProvider>
    </div>
  );
};

const PoiMarkers = ({ locations = [] }) => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const map = useMap();
  const [markers, setMarkers] = useState({});
  const clusterer = useRef(null);
  const [circleCenter, setCircleCenter] = useState(null);

  const handleClick = useCallback((ev) => {
    if (!map) return;
    if (!ev.latLng) return;
    map.panTo(ev.latLng);
    setCircleCenter(ev.latLng);
  });

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker, key) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <>
      <Circle
        radius={800}
        center={circleCenter}
        strokeColor={"#0c4cb3"}
        strokeOpacity={1}
        strokeWeight={3}
        fillColor={"#3b82f6"}
        fillOpacity={0.3}
      />

      {locations.map((poi) => (
        <AdvancedMarker
          title={poi.key}
          key={poi.key}
          position={poi.location}
          clickable={true}
          onClick={
            (handleClick,
            () => {
              setActiveMarker(poi.key),
                setIsOpen(() => (activeMarker === poi.key ? !isOpen : true));
            })
          }
        >
          <Pin
            background={"#FF0000"}
            glyphColor={"#FFEFEF"}
            borderColor={"#FFEFEF"}
          >
            {isOpen && activeMarker === poi.key && <ModalCard data={poi} />}
          </Pin>
        </AdvancedMarker>
      ))}
    </>
  );
};

export default MapComponent;
