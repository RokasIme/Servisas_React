import { useContext } from "react";
import { AdminTitle } from "../../../components/page-title/AdminTitle";
import { MastersContext } from "../../../context/masters/MastersContext";
import { MastersTable } from "../../../components/table/MastersTable";

export function PagePublishedMasters() {
  const { adminMasters } = useContext(MastersContext);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <AdminTitle title="Published masters" />
      <MastersTable data={adminMasters.filter((m) => m.is_published)} />
    </main>
  );
}
