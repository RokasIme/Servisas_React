import { MastersCard } from "./MastersCard";

export function MastersList({ data }) {
  return (
    <div className="container">
      <div id="movies" className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {data.map((master) => (
          <MastersCard key={master.id} data={master} />
        ))}
      </div>
    </div>
  );
}
