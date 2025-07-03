import { useContext } from "react";
import { MastersList } from "../../components/masters/MastersList";
import { MastersContext } from "../../context/masters/MastersContext";

export function PageMasters() {
  const { publicMasters } = useContext(MastersContext);

  return (
    <>
      {/* FILTER */}
      <MastersList data={publicMasters} />
    </>
  );
}
