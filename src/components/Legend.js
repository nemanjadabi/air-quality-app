import "./Legend.css";
import colors from "../colors";

const Legend = (props) => {
  return (
    <ul className="legend">
      {Object.entries(colors).map((item) => {
        return (
          <li className="item" style={{ backgroundColor: item[1] }} key={item[0]}>
            <span>{item[0] === 'VeryPolluted' ? 'Very Polluted' : item[0]}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default Legend;
