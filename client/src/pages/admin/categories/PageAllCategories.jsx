// import { useContext } from "react";
// import { CategoriesTable } from "../../../components/table/CategoriesTable";
// import { CategoriesContext } from "../../../context/categories/CategoriesContext";

import { AdminTitle } from "../../../components/page-title/AdminTitle";

export function PageAllCategories() {
  // const { adminCategories } = useContext(CategoriesContext);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <AdminTitle title="All categories" />
      {/* <CategoriesTable data={adminCategories} /> */}
    </main>
  );
}
