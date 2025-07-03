import { useContext } from "react";
import { CategoriesList } from "./CategoriesList";

import { CategoriesContext } from "../../context/categories/CategoriesContext";

export function AllCategories() {
  const { publicCategories } = useContext(CategoriesContext);

  return (
    <div className="container px-4 py-5" id="featured-3">
      <h2 className="pb-2 border-bottom">Masters by categories</h2>
      <CategoriesList data={publicCategories} />
    </div>
  );
}
