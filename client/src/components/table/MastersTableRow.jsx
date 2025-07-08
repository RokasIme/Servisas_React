import { useContext } from "react";
import { Link } from "react-router";
import { BadgeDraft } from "../badge/BadgeDraft";
import { BadgeSuccess } from "../badge/BadgeSuccess";
import defaultImg from "../../assets/default.webp";
import { MastersContext } from "../../context/masters/MastersContext";

export function MastersTableRow({ master }) {
  const { adminDeleteMaster } = useContext(MastersContext);
  const img = master.img ? master.img : defaultImg;

  function handleDeleteClick() {
    fetch("http://localhost:5439/api/admin/masters/" + master.id, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          adminDeleteMaster(master.id);
        }
      })
      .catch(console.error);
  }

  return (
    <tr>
      <td>{master.id}</td>
      <td>
        <img style={{ maxWidth: "5rem", maxHeight: "5rem" }} src={img} alt="master thumbnail" />
      </td>
      <td>{master.name}</td>
      <td>{master.lastName}</td>
      <td>{master.url_slug}</td>
      <td>{master.experience}</td>
      <td>{master.is_published ? <BadgeSuccess text="Published" /> : <BadgeDraft text="Draft" />}</td>
      <td>
        <div style={{ display: "flex", gap: "0.3rem" }}>
          <Link className="btn btn-primary" to={`/admin/masters/${master.url_slug}/edit`}>
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
