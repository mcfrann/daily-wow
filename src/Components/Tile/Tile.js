import { useEffect, useRef } from "react";
import "./Tile.css";

const Tile = ({
  key,
  movie,
  tileWow,
  fullLine,
  audio,
  start,
  currentWow,
  setCurrentWow,
}) => {
  const prevAudioRef = useRef(currentWow?.audio);

  useEffect(() => {
    if (prevAudioRef.current !== currentWow.audio) {
      start();
      prevAudioRef.current = currentWow.audio;
    }
  }, [currentWow.audio, start]);

  const handleClick = () => {
    // tileWow is the wow object for this tile
    if (!currentWow || currentWow.audio !== audio) {
      setCurrentWow({
        movie,
        full_line: fullLine,
        audio,
        current_wow_in_movie: tileWow,
      });
    } else {
      start();
    }
  };

  return (
    <div className="wow-tile" id={key}>
      <h1>
        Wow #{tileWow} of {movie}
      </h1>
      <p>The full line is: '{fullLine}'</p>
      <button className="play-wow" onClick={handleClick}>
        play
      </button>
    </div>
  );
};

export default Tile;
