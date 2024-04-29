import { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

function LocationMarker() {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 10);
    },
  });

  useEffect(
    function () {
      const interval = setInterval(function () {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            setPosition({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          });
          if (position) map.flyTo(position, 16);
        }
      }, 3000);
      return () => {
        clearInterval(interval);
      };
    },
    [map, position]
  );

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default LocationMarker;
