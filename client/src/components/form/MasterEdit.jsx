import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CategoriesContext } from "../../context/categories/CategoriesContext";
import { MastersContext } from "../../context/masters/MastersContext";
import defaultImg from "../../assets/default.webp";
import { WorkshopsContext } from "../../context/workshops/workshopsContext";

export function MasterEditForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { adminCategories } = useContext(CategoriesContext);
  const { adminMasters, adminRefreshMasters } = useContext(MastersContext);
  const { workshops } = useContext(WorkshopsContext);

  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [category, setCategory] = useState("0");
  const [experience, setExperience] = useState("");
  const [workshop, setWorkshop] = useState("0");
  const [status, setStatus] = useState("draft");

  useEffect(handleResetClick, [adminMasters, id]);

  function handleResetClick() {
    const masterData = id ? adminMasters.filter((m) => m.id === +id)[0] : null;

    if (masterData) {
      setImg(masterData.img);
      setName(masterData.name);
      setLastName(masterData.lastName);
      setCategory(masterData.url_slug);
      setExperience(masterData.experience);
      setWorkshop(masterData.workshop);
      setStatus(masterData.is_published === 0 ? "draft" : "publish");
    }
  }

  function handleImageChange(e) {
    const formData = new FormData();
    formData.append("thumbnail", e.target.files[0]);

    fetch("http://localhost:5439/api/admin/upload", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setImg(data.msg);
        }
      })
      .catch(console.error);
  }

  function handleMainFormSubmit(e) {
    e.preventDefault();

    const data = { name, lastName, status };

    if (img) {
      data.img = img.split("/").at(-1);
    }
    if (category) {
      data.category = category;
    }
    if (experience) {
      data.experience = experience;
    }
    if (workshop) {
      data.workshop = workshop;
    }

    fetch("http://localhost:5439/api/admin/masters/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          adminRefreshMasters();
          navigate("/admin/masters");
        }
      })
      .catch(console.error);
  }

  return (
    <>
      <form className="needs-validation col-12 col-md-10 col-lg-8 col-xl-6 mb-3">
        <div className="row g-3">
          <div className="col-12">
            <label htmlFor="image" className="form-label">
              Picture
            </label>
            <input onChange={handleImageChange} className="form-control" id="image" name="image" type="file" required />
            <div className="invalid-feedback">Valid image is required.</div>
          </div>
          <img id="image" className="col-12 movie-thumbnail" src={img ? img : defaultImg} alt="" />
          <p>Image url: {img}</p>
        </div>
      </form>

      <form onSubmit={handleMainFormSubmit} className="needs-validation col-12 col-md-10 col-lg-8 col-xl-6">
        <div className="row g-3">
          <div className="col-sm-12">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="form-control"
              id="name"
              placeholder=""
              required
            />
            <div className="invalid-feedback">Valid first name is required.</div>
          </div>
          <div className="col-sm-12">
            <label htmlFor="lastName" className="form-label">
              Last name
            </label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              type="text"
              className="form-control"
              id="lastName"
              placeholder=""
              required
            />
            <div className="invalid-feedback">Valid last name is required.</div>
          </div>

          <div className="col-12 col-sm-6">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="form-control"
              id="category"
            >
              <option value="0">Choose...</option>
              {adminCategories.map((c) => (
                <option key={c.url_slug} value={c.url_slug}>
                  {c.category}
                </option>
              ))}
            </select>
          </div>

          <div className="col-sm-12">
            <label htmlFor="experience" className="form-label">
              Experience
            </label>
            <input
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              type="text"
              className="form-control"
              id="experience"
              placeholder=""
              required
            />
            <div className="invalid-feedback">Valid last name is required.</div>
          </div>

          <div className="col-12 col-sm-6">
            <label htmlFor="workshop" className="form-label">
              workshop
            </label>
            <select
              onChange={(e) => setWorkshop(e.target.value)}
              value={workshop}
              className="form-control"
              id="workshop"
            >
              <option value="0">Choose...</option>
              {workshops.map((w) => (
                <option key={w.id} value={w.workshop}>
                  {w.workshop}
                </option>
              ))}
            </select>
          </div>

          <div className="my-3">
            <div className="form-check">
              <input
                onChange={() => setStatus("draft")}
                checked={status === "draft" ? "checked" : ""}
                id="draft"
                value="draft"
                name="status"
                type="radio"
                className="form-check-input"
                required
              />
              <label className="form-check-label" htmlFor="draft">
                Draft
              </label>
            </div>
            <div className="form-check">
              <input
                onChange={() => setStatus("publish")}
                checked={status === "publish" ? "checked" : ""}
                id="publish"
                value="publish"
                name="status"
                type="radio"
                className="form-check-input"
                required
              />
              <label className="form-check-label" htmlFor="publish">
                Publish
              </label>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="d-flex" style={{ gap: "1rem" }}>
          <button className="btn btn-success btn-lg" type="submit">
            Update
          </button>
          <button onClick={handleResetClick} className="btn btn-secondary btn-lg ms-auto" type="reset">
            Reset
          </button>
        </div>
      </form>
    </>
  );
}
