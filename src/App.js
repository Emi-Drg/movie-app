import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TopMovies from "./components/TopMovies";
import MovieChart from "./components/MovieChart";
import Favorites from "./components/Favorites";
import { MovieProvider } from "./context/movieContext";
import "@fortawesome/fontawesome-free/css/all.css";

function App() {
  return (
    <MovieProvider>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<TopMovies />} />
        <Route path="/pie" element={<MovieChart />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </MovieProvider>
  );
}

export default App;
