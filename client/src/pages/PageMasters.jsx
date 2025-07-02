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
