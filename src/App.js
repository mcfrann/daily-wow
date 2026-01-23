import "./App.css";
import { useState, useEffect } from "react";
import HomePage from "./Components/HomePage/HomePage";
import { Route, Routes, useNavigate } from "react-router-dom";
import FilteredPage from "./Components/FilteredPage/FilteredPage";
import Owen from "./Components/Owen/Owen";
import Oops from "./Components/Oops/Oops";
import search from "./images/search.png";
import owen from "./images/owen.jpg";
import owen2 from "./images/owen-w.JPG";
import owen3 from "./images/owen-o.JPG";

const App = () => {
  const [todaysWow, setTodaysWow] = useState([]);
  const [currentWow, setCurrentWow] = useState({});
  const [error, setError] = useState("");
  const [filteredWows, setFilteredWows] = useState([]);
  const [allWows, setAllWows] = useState([]);
  const [input, setInput] = useState("");
  const [owenGraphic, setOwenGraphic] = useState(owen);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://owen-wilson-wow-api.onrender.com/wows/random")
      .then((res) => {
        if (!res.ok) {
          setError("Wow. Nothing is here.");
        } else {
          return res.json();
        }
      })
      .then((wow) => {
        const randomWow = {
          id: Date.now(),
          movie: wow[0].movie,
          year: wow[0].year,
          director: wow[0].director,
          character: wow[0].character,
          timestamp: wow[0].timestamp,
          full_line: wow[0].full_line,
          current_wow_in_movie: wow[0].current_wow_in_movie,
          total_wows_in_movie: wow[0].total_wows_in_movie,
          audio: wow[0].audio,
        };
        setTodaysWow(randomWow);
        setCurrentWow(randomWow);
      });
    fetch("https://owen-wilson-wow-api.onrender.com/wows/ordered/0-90")
      .then((res) => {
        if (!res.ok) {
          setError("Wow. Nothing is here.");
        } else {
          return res.json();
        }
      })
      .then((movies) => {
        setAllWows(movies);
      });
  }, []);

  // Sync currentWow to todaysWow when on home route
  useEffect(() => {
    if (window.location.pathname === "/") {
      setCurrentWow(todaysWow);
    }
  }, [todaysWow]);

  const handleClick = (e) => {
    if (e) e.preventDefault();
    const filtered = [];
    for (let i = 0; i < allWows.length; i++) {
      if (allWows[i].movie.toLowerCase().includes(input.toLowerCase())) {
        filtered.push(allWows[i]);
      }
    }
    if (!input) {
      alert("please insert an Owen Wilson movie");
    } else if (input && filtered.length === 0) {
      navigate("/oops");
      setInput("");
    } else if (input && filtered.length > 0) {
      setFilteredWows(filtered);
      navigate("/filtered");
    }
  };

  const updateInput = (e) => {
    setInput(e.target.value);
  };

  const start = () => {
    const audio = new Audio(currentWow.audio);
    audio.play();
    setTimeout(() => setOwenGraphic(owen2), 200);
    setTimeout(() => setOwenGraphic(owen3), 400);
    setTimeout(() => setOwenGraphic(owen2), 600);
    setTimeout(() => setOwenGraphic(owen), 800);
  };

  return (
    <section className="App">
      <div className="page-container">
        <Owen owenGraphic={owenGraphic} start={start} />
        <div className="about-container">
          <div className="top-nav">
            <form onSubmit={handleClick}>
              <input
                className="search"
                value={input}
                onChange={updateInput}
                type="text"
                placeholder="wows by movie"
                required
              ></input>
            </form>
            <button className="search-button" type="submit">
              <img
                className="search-img top"
                src={search}
                alt="search icon"
                onClick={handleClick}
              />
            </button>
          </div>
          <div className="about-windows">
            <Routes>
              <Route
                exact
                path="/"
                element={<HomePage todaysWow={todaysWow} error={error} />}
              />
              <Route
                path="/filtered"
                element={
                  <FilteredPage
                    filteredWows={filteredWows}
                    setCurrentWow={setCurrentWow}
                    currentWow={currentWow}
                    todaysWow={todaysWow}
                    start={start}
                    input={input}
                    setInput={setInput}
                  />
                }
              />
              <Route path="/oops" element={<Oops />} />
            </Routes>
            <div className="bottom-nav">
              <form>
                <input
                  className="search-bottom"
                  value={input}
                  onChange={updateInput}
                  type="text"
                  placeholder="wows by movie"
                  required
                ></input>
              </form>
              <img
                className="search-img bottom"
                src={search}
                alt="search icon"
                onClick={handleClick}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
