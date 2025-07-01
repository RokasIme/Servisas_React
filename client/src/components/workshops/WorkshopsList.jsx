import { MastersCard } from "../masters/MastersCard";
import { WorkshopCard } from "./WorkshopCard";

export function WorkshopsList({ data, masters }) {
  return (
    <div className="text-center container">
      <div id="workshops" className="row">
        {data.map((workshop) => {
          const filteredMasters = masters.filter((master) => master.workshop_id === workshop.id);

          return (
            <div key={workshop.id}>
              <WorkshopCard data={workshop} />
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {filteredMasters.map((master) => (
                  <MastersCard key={master.id} data={master} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
