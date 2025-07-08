import { useContext } from "react";
import { AdminTitle } from "../../../components/page-title/AdminTitle";
import { MastersContext } from "../../../context/masters/MastersContext";
import { MastersTable } from "../../../components/table/MastersTable";

export function PageAllMasters() {
  const { adminMasters } = useContext(MastersContext);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <AdminTitle title="All masters" />
      <MastersTable data={adminMasters} />
    </main>
  );
}
