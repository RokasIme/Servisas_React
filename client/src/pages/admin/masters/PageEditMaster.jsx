import { MasterEditForm } from "../../../components/form/MasterEdit";
import { AdminTitle } from "../../../components/page-title/AdminTitle";

export function PageEditMaster() {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <AdminTitle title="Edit master" />
      <MasterEditForm />
    </main>
  );
}
