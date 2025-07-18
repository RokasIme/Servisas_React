import { WorkshopNewForm } from "../../../components/form/WorkshopNew";
import { AdminTitle } from "../../../components/page-title/AdminTitle";

export function PageNewWorkshop() {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <AdminTitle title="New workshop" />
      <WorkshopNewForm />
    </main>
  );
}
