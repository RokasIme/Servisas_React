import { useContext, useEffect, useState } from "react";
import { UserContext } from "../user/UserContext";
import { initialMastersContext } from "./initialMastersContext";
import { MastersContext } from "./MastersContext";

export function MastersContextWrapper(props) {
  const [publicMasters, setPublicMasters] = useState(initialMastersContext.publicMasters);
  const [adminMasters, setAdminMasters] = useState(initialMastersContext.adminMasters);

  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (!isLoggedIn) {
      fetch("http://localhost:5439/api/public/masters", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setPublicMastersList(data.list);
          }
        })
        .catch(console.error);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      fetch("http://localhost:5439/api/admin/masters", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setAdminMastersList(data.list);
          }
        })
        .catch(console.error);
    }
  }, [isLoggedIn]);

  function setPublicMastersList(data) {
    setPublicMasters(() => data);
  }

  function setAdminMastersList(data) {
    setAdminMasters(() => data);
  }

  function adminDeleteMaster(id) {
    setPublicMasters((list) => list.filter((m) => m.id !== id));
    setAdminMasters((list) => list.filter((m) => m.id !== id));
  }

  const value = {
    publicMasters,
    adminMasters,
    setPublicMasters,
    setAdminMastersList,
    adminDeleteMaster,
  };

  return <MastersContext.Provider value={value}>{props.children}</MastersContext.Provider>;
}
