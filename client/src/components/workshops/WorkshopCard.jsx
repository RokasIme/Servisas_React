export function WorkshopCard({ data }) {
  return (
    <div className="col-lg-6 col-md-8 mx-auto">
      <h1 className="fw-light">{data.workshop}</h1>
      <p className="lead text-body-secondary">
        {data.city}, {data.adress}
      </p>
    </div>
  );
}
