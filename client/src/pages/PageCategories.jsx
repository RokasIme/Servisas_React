import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { PageTitle } from "../components/page-title/PageTitle";
import { capitalize } from "../lib/capitalize";

export function PageCategories() {
  const params = useParams();
  const [mastersData, setMastersData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5439/api/masters/" + params.category, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setMastersData(() => data.list);
        }
      })
      .catch(console.error);
  }, [params.category]);

  return (
    <div className="container">
      <PageTitle title={capitalize(params.category)} />
    </div>
  );
}
