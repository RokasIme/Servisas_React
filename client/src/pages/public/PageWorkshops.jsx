import { useState, useEffect } from "react";
import { WorkshopsList } from "../../components/workshops/WorkshopsList";
import {} from "react";

export function PageWorkshops() {
  const [data, setData] = useState([]);
  const [mastersData, setMastersData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5439/api/public/workshops", {
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

  useEffect(() => {
    fetch("http://localhost:5439/api/public/masters", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setMastersData(() => data.list);
        }
      })
      .catch(console.error);
  }, []);
  return <WorkshopsList data={data} masters={mastersData} />;
}
