import { WorkshopEditForm } from "../../../components/form/WorkshopEdit";
import { AdminTitle } from "../../../components/page-title/AdminTitle";

export function PageEditWorkshop() {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <AdminTitle title="Edit workshop" />
      <WorkshopEditForm />
    </main>
  );
}
