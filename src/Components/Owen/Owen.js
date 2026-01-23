import "./Owen.css";

const Owen = ({ owenGraphic, start }) => {
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
