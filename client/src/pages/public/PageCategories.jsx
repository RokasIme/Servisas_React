import { useParams } from "react-router";
import { PageTitle } from "../../components/page-title/PageTitle";
import { capitalize } from "../../lib/capitalize";
import { MastersList } from "../../components/masters/MastersList";
import { MastersContext } from "../../context/masters/MastersContext";
import { useContext } from "react";

export function PageCategories() {
  const params = useParams();
  const { publicMasters } = useContext(MastersContext);
  const mastersByCategory = publicMasters.filter((m) => m.url_slug === params.category);

  return (
    <div className="container">
      <PageTitle title={capitalize(params.category)} />
      <MastersList data={mastersByCategory} />
    </div>
  );
}
