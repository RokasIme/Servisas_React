import { WorkshopCard } from "./WorkshopCard";

export function WorkshopsList({ data }) {
  return (
    <div className="container">
      <div id="workshops" className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {data.map((workshop) => (
          <WorkshopCard key={workshop.id} data={workshop} />
        ))}
      </div>
    </div>
  );
}
