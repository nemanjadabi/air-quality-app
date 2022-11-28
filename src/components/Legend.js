import "./Legend.css";
const markerColor = {
  Excellent: "#47dfaa",
  Good: "#29b4e3",
  Accaptable: "#f2f26d",
  Polluted: "#8c3998",
  "Very Polluted": "#db0456",
};

const Legend = () => {
  return (
    <ul className="legend">
      <li className="item" style={{ backgroundColor: markerColor.Excellent }}>
        <span>Excellent</span>
      </li>
      <li className="item" style={{ backgroundColor: markerColor.Good }}>
        <span>Good</span>
      </li>
      <li className="item" style={{ backgroundColor: markerColor.Accaptable }}>
        <span>Acceptable</span>
      </li>
      <li className="item" style={{ backgroundColor: markerColor.Polluted }}>
        <span>Polluted</span>
      </li>
      <li
        className="item"
        style={{ backgroundColor: markerColor["Very Polluted"] }}
      >
        <span>Very Polluted</span>
      </li>
    </ul>
  );
};

export default Legend;
