import React, { Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
const MovieSearch = React.lazy(() => import("./pages/MovieSearch"));
const Favourites = React.lazy(() => import("./pages/Favourites"));
const MoviesDetail = React.lazy(() => import("./pages/MovieDetail"));

function App() {
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<MovieSearch />}></Route>
          <Route path="favourites" element={<Favourites />}></Route>
          <Route path="movie-details" element={<MoviesDetail />}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
