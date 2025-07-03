import { useState, useEffect } from "react";
import { MastersList } from "../../components/masters/MastersList";

export function PageMasters() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5439/api/public/masters", {
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
