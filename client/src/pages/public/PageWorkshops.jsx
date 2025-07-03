import { useContext } from "react";
import { WorkshopsList } from "../../components/workshops/WorkshopsList";
import {} from "react";
import { MastersContext } from "../../context/masters/MastersContext";
import { WorkshopsContext } from "../../context/workshops/workshopsContext";

export function PageWorkshops() {
  const { publicMasters } = useContext(MastersContext);
  const { workshops } = useContext(WorkshopsContext);

  return <WorkshopsList data={workshops} masters={publicMasters} />;
}
