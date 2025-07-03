import { useEffect, useState } from "react";

import { initialWorkshopsContext } from "./initialWorkshopsContext";
import { WorkshopsContext } from "./workshopsContext";

export function WorkshopsContextWrapper(props) {
  const [workshops, setWorkshops] = useState(initialWorkshopsContext.workshops);

  useEffect(() => {
    fetch("http://localhost:5439/api/public/workshops", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setWorkshopsList(data.list);
        }
      })
      .catch(console.error);
  }, []);

  function setWorkshopsList(data) {
    setWorkshops(() => data);
  }

  function adminDeleteWorkshop(id) {
    setWorkshops((list) => list.filter((w) => w.id !== id));
  }

  const value = {
    workshops,
    setWorkshops,
    adminDeleteWorkshop,
  };

  return <WorkshopsContext.Provider value={value}>{props.children}</WorkshopsContext.Provider>;
}
