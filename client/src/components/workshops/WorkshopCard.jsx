export function WorkshopCard({ data }) {
  return (
    <div className="col-lg-12 col-md-12 mx-auto">
      <h1 className="fw-light">{data.workshop}</h1>
      <p className="lead text-body-secondary">
        {data.city}, {data.adress}
      </p>
    </div>
  );
}
