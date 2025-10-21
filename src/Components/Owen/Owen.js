import owen from "../../images/owen.jpg";
import owen2 from "../../images/owen-w.JPG";
import owen3 from "../../images/owen-o.JPG";
import { useState } from "react";
import "./Owen.css";

const Owen = ({ todaysWow }) => {
  const [owenGraphic, setOwenGraphic] = useState(owen);

  const start = () => {
    const audio = new Audio(todaysWow.audio);
    audio.play();
    setTimeout(() => setOwenGraphic(owen2), 200);
    setTimeout(() => setOwenGraphic(owen3), 400);
    setTimeout(() => setOwenGraphic(owen2), 600);
    setTimeout(() => setOwenGraphic(owen), 800);
  };

  return (
    <div className="owen-container">
      <img
        className="owen-graphic"
        src={owenGraphic}
        alt="owen graphic"
        onClick={start}
      />
    </div>
  );
};

export default Owen;
