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
      fetchPublicMasters();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchAdminMasters();
    }
  }, [isLoggedIn]);

  function fetchPublicMasters() {
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

  function fetchAdminMasters() {
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

  function adminRefreshMasters() {
    fetchPublicMasters();
    fetchAdminMasters();
  }

  const value = {
    publicMasters,
    adminMasters,
    setPublicMasters,
    setAdminMastersList,
    adminDeleteMaster,
    adminRefreshMasters,
  };

  return <MastersContext.Provider value={value}>{props.children}</MastersContext.Provider>;
}
