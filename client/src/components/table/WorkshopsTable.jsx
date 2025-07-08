import { WorkshopsTableRow } from "./WorkshopsTableRow";

export function WorkshopsTable({ data }) {
  return (
    <div className="table-responsive small">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Workshop</th>
            <th scope="col">City</th>
            <th scope="col">Adress</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <WorkshopsTableRow key={item.id} workshop={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
