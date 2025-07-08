import { Link } from "react-router";
import { WorkshopsContext } from "../../context/workshops/workshopsContext";
import { useContext } from "react";

export function WorkshopsTableRow({ workshop }) {
  const { adminDeleteWorkshop } = useContext(WorkshopsContext);

  function handleDeleteClick() {
    fetch("http://localhost:5439/api/admin/workshops/" + workshop.id, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          adminDeleteWorkshop(workshop.id);
        }
      })
      .catch(console.error);
  }

  return (
    <tr>
      <td>{workshop.id}</td>
      <td>{workshop.workshop}</td>
      <td>{workshop.city}</td>
      <td>{workshop.adress}</td>
      <td>
        <div style={{ display: "flex", gap: "0.3rem" }}>
          <Link to={`/admin/workshops/${workshop.id}/edit`} className="btn btn-primary">
            Edit
          </Link>
          <button onClick={handleDeleteClick} className="btn btn-danger" type="button">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
