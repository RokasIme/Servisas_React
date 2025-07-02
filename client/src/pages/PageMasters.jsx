import { useState } from "react";
import { MastersList } from "../components/masters/MastersList";
import { useEffect } from "react";

export function PageMasters() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5439/api/masters", {
      method: "GET",
      credentials: "include",
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
      <MastersList data={data} />
    </>
  );
}

// const userId = 123; // prisijungusio vartotojo ID (pvz. iš context ar localStorage)

// useEffect(() => {
//   fetch("/api/masters")
//     .then((res) => res.json())
//     .then(({ masters, likes }) => {
//       const mastersWithHearts = masters.map((master) => {
//         const userLike = likes.find((like) => like.master_id === master.id && like.user_id === userId);
//         return {
//           ...master,
//           likedByUser: !!userLike,
//           likeCount: likes.filter((like) => like.master_id === master.id).reduce((sum, l) => sum + l.like_count, 0),
//         };
//       });

//       setMasters(mastersWithHearts);
//     });
// }, []);
