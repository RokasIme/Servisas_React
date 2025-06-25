import { useState } from "react";
import { MovieList } from "../components/movies/MovieList";
import { useEffect } from "react";

export function PageMasters() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5439/api/masters", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setData(() => data.list);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <>
      {/* FILTER */}
      {/* <MovieList data={data} /> */}
      Masters Page
    </>
  );
}
