import { BrowserRouter, Route, Routes } from "react-router";

import { UserContextWrapper } from "./context/user/UserContextWrapper";
import { CategoriesContextWrapper } from "./context/categories/CategoriesContextWrapper";

import { PublicLayout } from "./layout/PublicLayout";
import { PrivateLayout } from "./layout/PrivateLayout";

import { PageLogin } from "./pages/public/auth/PageLogin";
import { PageRegister } from "./pages/public/auth/PageRegister";

import { PageHome } from "./pages/public/PageHome";
import { PageMasters } from "./pages/public/PageMasters";
import { PageCategories } from "./pages/public/PageCategories";
import { PageWorkshops } from "./pages/public/PageWorkshops";

import { PageDashboard } from "./pages/admin/PageDashboard";

import { PageAllCategories } from "./pages/admin/categories/PageAllCategories";
import { PageNewCategory } from "./pages/admin/categories/PageNewCategory";
import { PagePublishedCategories } from "./pages/admin/categories/PagePublishedCategories";
import { PageDraftCategories } from "./pages/admin/categories/PageDraftCategories";
import { PageEditCategory } from "./pages/admin/categories/PageEditCategory";

import { PageAllMasters } from "./pages/admin/masters/PageAllMasters";
import { PageNewMaster } from "./pages/admin/masters/PageNewMaster";
import { PageEditMaster } from "./pages/admin/masters/PageEditMaster";
import { PagePublishedMasters } from "./pages/admin/masters/PagePublishedMasters";
import { PageDraftMasters } from "./pages/admin/masters/PageDraftMasters";

import { PageAllWorkshops } from "./pages/admin/workshops/PageAllWorkshops";
import { PageNewWorkshop } from "./pages/admin/workshops/PageNewworkshop";
import { PageEditWorkshop } from "./pages/admin/workshops/PageEditWorkshop";

import { PageNotFound } from "./pages/PageNotFound";

export function App() {
  return (
    <UserContextWrapper>
      <CategoriesContextWrapper>
        <BrowserRouter>
          <Routes>
            <Route Component={PublicLayout}>
              <Route index path="/" element={<PageHome />} />
              <Route path="/masters" element={<PageMasters />} />
              <Route path="/masters/:category" element={<PageCategories />} />
              <Route path="/workshops" element={<PageWorkshops />} />
              <Route path="/register" element={<PageRegister />} />
              <Route path="/login" element={<PageLogin />} />
            </Route>
            <Route Component={PrivateLayout}>
              <Route path="/admin" element={<PageDashboard />} />
              <Route path="/admin/categories" element={<PageAllCategories />} />
              <Route path="/admin/categories/new" element={<PageNewCategory />} />
              <Route path="/admin/categories/published" element={<PagePublishedCategories />} />
              <Route path="/admin/categories/draft" element={<PageDraftCategories />} />
              <Route path="/admin/categories/:category" element={<PageEditCategory />} />
              <Route path="/admin/categories/:category/edit" element={<PageEditCategory />} />

              <Route path="/admin/masters" element={<PageAllMasters />} />
              <Route path="/admin/masters/new" element={<PageNewMaster />} />
              <Route path="/admin/masters/published" element={<PagePublishedMasters />} />
              <Route path="/admin/masters/draft" element={<PageDraftMasters />} />
              <Route path="/admin/masters/:id" element={<PageEditMaster />} />
              <Route path="/admin/masters/:id/edit" element={<PageEditMaster />} />

              <Route path="/admin/workshops" element={<PageAllWorkshops />} />
              <Route path="/admin/workshops/new" element={<PageNewWorkshop />} />
              <Route path="/admin/workshops/:id" element={<PageEditWorkshop />} />
              <Route path="/admin/workshops/:id/edit" element={<PageEditWorkshop />} />
            </Route>
            <Route Component={PublicLayout}>
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CategoriesContextWrapper>
    </UserContextWrapper>
  );
}
