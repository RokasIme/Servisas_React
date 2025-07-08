import { MastersTableRow } from "./MastersTableRow";

export function MastersTable({ data }) {
  return (
    <div className="table-responsive small">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Url</th>
            <th scope="col">Experience</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <MastersTableRow key={item.id} master={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
