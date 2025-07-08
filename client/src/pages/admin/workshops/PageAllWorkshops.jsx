// import { useContext } from "react";
import { useContext } from "react";
import { AdminTitle } from "../../../components/page-title/AdminTitle";
import { WorkshopsTable } from "../../../components/table/WorkshopsTable";
import { WorkshopsContext } from "../../../context/workshops/workshopsContext";

export function PageAllWorkshops() {
  const { workshops } = useContext(WorkshopsContext);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <AdminTitle title="All workshops" />
      <WorkshopsTable data={workshops} />
    </main>
  );
}
