import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { WorkshopsContext } from "../../context/workshops/workshopsContext";

export function WorkshopEditForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { workshops, fetchWorkshops } = useContext(WorkshopsContext);

  const [workshop, setWorkshop] = useState("");
  const [city, setCity] = useState("");
  const [adress, setAdress] = useState("");

  useEffect(handleResetClick, [workshops, id]);

  function handleResetClick() {
    const workshopData = id ? workshops.filter((w) => w.id === +id)[0] : null;

    if (workshopData) {
      setWorkshop(workshopData.workshop);
      setCity(workshopData.city);
      setAdress(workshopData.adress);
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:5439/api/admin/workshops/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ workshop, city, adress }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          fetchWorkshops();
          navigate("/admin/workshops");
        }
      })
      .catch(console.error);
  }

  return (
    <form onSubmit={handleFormSubmit} className="needs-validation col-12 col-md-10 col-lg-8 col-xl-6">
      <div className="row g-3">
        <div className="col-sm-12">
          <label htmlFor="name" className="form-label">
            Workshop name
          </label>
          <input
            onChange={(e) => setWorkshop(e.target.value)}
            value={workshop}
            type="text"
            className="form-control"
            id="name"
            placeholder=""
            required
          />
          <div className="invalid-feedback">Valid first name is required.</div>
        </div>

        <div className="col-sm-12">
          <label htmlFor="url" className="form-label">
            City
          </label>
          <input
            onChange={(e) => setCity(e.target.value)}
            value={city}
            type="text"
            className="form-control"
            id="url"
            placeholder=""
            required
          />
          <div className="invalid-feedback">Valid last name is required.</div>
        </div>

        <div className="col-sm-12">
          <label htmlFor="description" className="form-label">
            Adress
          </label>
          <textarea
            onChange={(e) => setAdress(e.target.value)}
            value={adress}
            className="form-control"
            id="description"
            placeholder=""
            required
          ></textarea>
          <div className="invalid-feedback">Valid description is required.</div>
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
  );
}
