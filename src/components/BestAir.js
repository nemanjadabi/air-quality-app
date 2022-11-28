import "./BestAir.css";
import { useState } from 'react'


const BestAir = (props) => {
const[bestAddress, setBestAddress] = useState('')
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${props.latitude},${props.longitude}&key=${props.API_key}`
  ).then(response => response.json()).then(data => {
    console.log(data);
    setBestAddress(data.results[0]["formatted_address"])
    console.log(bestAddress);
  });
  return (
    <div className="highest">
      <p className="text">
        <strong>Best air quality is at:</strong> {bestAddress}
      </p>
    </div>
  );
};

export default BestAir;
