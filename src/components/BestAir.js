import "./BestAir.css";
import { useState, useEffect } from "react";
import googleMapsApi from "./../service/googleMapsApi";

const BestAir = (props) => {
  const [bestAddress, setBestAddress] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      const data = await googleMapsApi.fetchLocation(props.location);

      setBestAddress(data.results[0]["formatted_address"]);
    };
    fetchAddress();
  }, [props.location]);

  return (
    <div className="highest">
      <p className="text">
        <strong>Best air quality is at:</strong> {bestAddress}
      </p>
    </div>
  );
};

export default BestAir;
