// import { useEffect, useState } from "react";
import { MastersCard } from "./MastersCard";

export function MastersList({ data }) {
  // const [masters, setMasters] = useState([]);
  // const [userLikes, setUserLikes] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:5439/api/masters")
  //     .then(res => res.json())
  //     .then(data => setMasters(() => data.list))
  //     .catch(console.error);
  // }, []);

  // useEffect(() => {
  //   fetch("http://localhost:5439/api/userLikes")
  //     .then(res => res.json())
  //     .then(data => setUserLikes(() => data.list))
  //     .catch(console.error);
  // }, []);

  return (
    <div className="container">
      <div id="movies" className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {data.map((master) => (
          <MastersCard key={master.id} data={master} />
        ))}
      </div>
    </div>
  );
}
