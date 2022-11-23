import { useEffect, useState } from "react";
import { GoogleMap, Circle, LoadScript } from "@react-google-maps/api";
import "./Map.css";
import Spinner from "./Spinner";

const markerColor = {
  "je izvanredan": "#6ab858",
  Excellent: "#6ab858",
  Good: "#1fc1de",
  Dobar: "#1fc1de",
  Acceptable: "#f2f26d",
  Moderate: "#f2f26d",
  Polluted: "#8c3998",
  "Very Polluted": "#db0456",
};

const Map = () => {
  const [devData, setDevData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const devicesData = [];
    const fetchData = async () => {
      const response = await fetch(
        "https://api.allthingstalk.io/ground/3s61Mf0HvqudWXXjv2QzUCnq/devices",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer maker:4tSxzKTe2VXvwvpXy5KwocfaRQOIt8CTo1a1sbTL",
          },
        }
      );
      const data = await response.json();
      for (const item of data.items) {
        const response = await fetch(
          `https://api.allthingstalk.io/device/${item.id}/state`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer maker:4tSxzKTe2VXvwvpXy5KwocfaRQOIt8CTo1a1sbTL",
            },
          }
        );
        const data = await response.json();
        if (data["air-quality"]?.value && data.location?.value) {
          devicesData.push({
            airQuality: data["air-quality"].value,
            locationLat: data.location.value.latitude,
            locationLng: data.location.value.longitude,
          });
        }
      }
      setDevData(devicesData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const setMarkerColor = (value) => {
    return markerColor[value];
  };

  return (
    <>
      {loading && <Spinner />}
      <LoadScript googleMapsApiKey="AIzaSyA_X65tYFozMVL5ORcQjmkYH08MSBn0H4E">
        <GoogleMap
          zoom={13}
          center={{ lat: 44.8, lng: 20.45 }}
          mapContainerClassName="map-container"
        >
          {devData.map((item) => (
            <Circle
              key={item.locationLat}
              center={{ lat: item.locationLat, lng: item.locationLng }}
              options={{
                strokeColor: setMarkerColor(item.airQuality),
                strokeOpacity: 1,
                strokeWeight: 2,
                fillColor: setMarkerColor(item.airQuality),
                fillOpacity: 0.8,
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
      </LoadScript>
    </>
  );
};

export default Map;
