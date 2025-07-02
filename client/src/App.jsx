import { BrowserRouter, Route, Routes } from "react-router";
import { PublicLayout } from "./layout/PublicLayout";
import { PageHome } from "./pages/PageHome";
import { PageWorkshops } from "./pages/PageWorkshops";
import { PageLogin } from "./pages/public/auth/PageLogin";
import { PageRegister } from "./pages/public/auth/PageRegister";
import { PageMasters } from "./pages/PageMasters";
import { PageCategories } from "./pages/PageCategories";
import { UserContextWrapper } from "./context/user/UserContextWrapper";
import { PrivateLayout } from "./layout/PrivateLayout";
import { PageDashboard } from "./pages/admin/PageDashboard";
import { PageAllCategories } from "./pages/admin/PageAllCategories";

export function App() {
  return (
    <UserContextWrapper>
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
            <Route path="/admin" element={<PageDashboard />}></Route>
            <Route path="/admin/categories" element={<PageAllCategories />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextWrapper>
  );
}
