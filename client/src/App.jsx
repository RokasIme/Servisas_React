import { BrowserRouter, Route, Routes } from "react-router";
import { PublicLayout } from "./layout/PublicLayout";
import { PageHome } from "./pages/PageHome";
import { PageWorkshops } from "./pages/PageWorkshops";
import { PageLogin } from "./pages/PageLogin";
import { PageRegister } from "./pages/PageRegister";
import { PageMasters } from "./pages/PageMasters";
import { PageCategories } from "./pages/PageCategories";

export function App() {
  return (
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
      </Routes>
    </BrowserRouter>
  );
}
