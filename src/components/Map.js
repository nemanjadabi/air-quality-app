import { useEffect, useState } from "react";
import { GoogleMap, Circle, LoadScript } from "@react-google-maps/api";
import "./Map.css";
import Spinner from "./Spinner";
import BestAir from "./BestAir";


const markerColor = {
  "je izvanredan": "#47dfaa",
  Excellent: "#47dfaa",
  Good: "#29b4e3",
  Dobar: "#29b4e3",
  Acceptable: "#f2f26d",
  Moderate: "#f2f26d",
  Polluted: "#8c3998",
  "Very Polluted": "#db0456",
};

const API_key = "AIzaSyA_X65tYFozMVL5ORcQjmkYH08MSBn0H4E"

const Map = () => {
  const [devData, setDevData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lowestPm, setLowestPm] = useState(null);

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
        if (
          data["air-quality"]?.value &&
          data.location?.value &&
          data.location.value.latitude > 44.74 &&
          data.location.value.latitude < 44.83 &&
          data.location.value.longitude > 20.36 &&
          data.location.value.longitude < 20.55
        ) {
          devicesData.push({
            pm10: data["pm10"].value,
            airQuality: data["air-quality"].value,
            locationLat: data.location.value.latitude,
            locationLng: data.location.value.longitude,
          });
        }
      }

      // const reverseLocation = async () => {
      //   const response = await fetch(
      //     "http://maps.googleapis.com/maps/api/geocode/json?latlng=" +
      //       lowestPm.locationLat +
      //       "," +
      //       lowestPm.locationLng +
      //       "sensor=false"
      //   );
      //   const data = await response.json();
      //   console.log(data);
      // };

      const lowestPm10 = devicesData.reduce((pValue, cValue) =>
        pValue["pm10"] <= cValue["pm10"] ? pValue : cValue
      );

      setDevData(devicesData);
      setLoading(false);
      setLowestPm(lowestPm10);
      // reverseLocation();
    };
    fetchData();
  }, []);

  const setMarkerColor = (value) => {
    return markerColor[value];
  };

  return (
    <div className="wrapper">
      {loading && <Spinner />}
      {!loading && (
        <BestAir latitude={lowestPm.locationLat} longitude={lowestPm.locationLng} API_key={API_key}/>
      )}
      <LoadScript googleMapsApiKey={API_key}>
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
      </LoadScript>
    </div>
  );
};

export default Map;
