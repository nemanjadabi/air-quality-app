import Map from "./components/Map";
import Spinner from "./components/Spinner";
import BestAir from "./components/BestAir";
import Legend from "./components/Legend";
import { useEffect, useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import GoogleApiKey from "./googleApiKey";
import aTT from "./service/allThingsTalkApi";

function App() {
  const [devData, setDevData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lowestPm, setLowestPm] = useState(null);

  useEffect(() => {
    const devicesData = [];
    const fetchData = async () => {
      const data = await aTT.fetchAllDevices();

      for (const item of data.items) {
        const data = await aTT.fetchDeviceState(item.id);
        if (data.airQuality && data.location) {
          devicesData.push({
            id: item.id,
            pm10: data.pm10,
            airQuality: data.airQuality,
            location: data.location,
          });
        }
      }

      const lowestPm10 = devicesData.reduce((pValue, cValue) =>
        pValue["pm10"] <= cValue["pm10"] ? pValue : cValue
      );

      setDevData(devicesData);
      setLoading(false);
      setLowestPm(lowestPm10);
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading && <Spinner />}
      {!loading && <BestAir location={lowestPm.location} />}
      {!loading && <Legend />}
      <LoadScript googleMapsApiKey={GoogleApiKey}>
        <Map devData={devData} />
      </LoadScript>
    </div>
  );
}

export default App;
