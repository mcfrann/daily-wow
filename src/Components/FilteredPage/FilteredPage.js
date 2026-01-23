import "./FilteredPage.css";
import Tile from "../Tile/Tile";
import { useNavigate } from "react-router-dom";

const FilteredPage = ({
  filteredWows,
  setCurrentWow,
  currentWow,
  todaysWow,
  start,
  input,
  setInput,
}) => {
  const navigate = useNavigate();
  let counter = 0;

  const filtered = filteredWows.map((wow) => (
    <Tile
      key={(counter += 1)}
      movie={wow.movie}
      tileWow={wow.current_wow_in_movie}
      fullLine={wow.full_line}
      audio={wow.audio}
      start={start}
      setCurrentWow={setCurrentWow}
      currentWow={currentWow}
    />
  ));

  const handleClick = () => {
    setInput("");
    setCurrentWow(todaysWow);
    navigate("/");
  };

  return (
    <>
      <h1 className="about-header">Wows in movies containing {`"${input}"`}</h1>
      <div className="filtered-container">{filtered}</div>
      <button className="back-home" onClick={handleClick}>
        Back to Today's Wow
      </button>
    </>
  );
};

export default FilteredPage;
