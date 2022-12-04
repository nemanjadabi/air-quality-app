import { GoogleMap, Circle } from "@react-google-maps/api";
import "./Map.css";
import colors from "../colors";

const Map = (props) => {
  const setMarkerColor = (value) => {
    return colors[value];
  };
  return (
    <div className="wrapper">
      <GoogleMap
        zoom={13}
        center={{ lat: 44.8, lng: 20.45 }}
        mapContainerClassName="map-container"
      >
        {props.devData.map((item) => (
          <Circle
            key={item.id}
            center={{
              lat: item.location.latitude,
              lng: item.location.longitude,
            }}
            options={{
              strokeColor: setMarkerColor(item.airQuality),
              strokeOpacity: 1,
              strokeWeight: 2,
              fillColor: setMarkerColor(item.airQuality),
              fillOpacity: 0.9,
              clickable: false,
              draggable: false,
              editable: false,
              visible: true,
              radius: 200,
              zIndex: 1,
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
