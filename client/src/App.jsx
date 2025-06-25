import { BrowserRouter, Route, Routes } from "react-router";
import { PublicLayout } from "./layout/PublicLayout";
import { PageHome } from "./pages/PageHome";
import { PageCategories } from "./pages/PageCategories";
import { PageLogin } from "./pages/PageLogin";
import { PageRegister } from "./pages/PageRegister";
import { PageMasters } from "./pages/PageMasters";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={PublicLayout}>
          <Route index path="/" element={<PageHome />} />
          <Route path="/masters" element={<PageMasters />} />
          <Route path="/categories" element={<PageCategories />} />
          <Route path="/register" element={<PageRegister />} />
          <Route path="/login" element={<PageLogin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
