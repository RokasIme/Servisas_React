import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export function MastersCard({ data }) {
  return (
    <div className="col">
      <div className="card shadow-sm">
        <div className="photo">
          <img
            className="bd-placeholder-img card-img-top"
            src={"http://localhost:5439/img/masters/" + data.img}
            alt="Photo"
          />
          <div data-count={`${data.id}`} className="likeCount">
            {data.likesCount}
          </div>
          <FontAwesomeIcon
            // onClick={}
            data-push={`${data.id}`}
            className={` ${data.heartColor === "1" ? "heartColor" : ""} clickHeart fa`}
            icon={faHeart}
          />
        </div>
        <div className="card-body">
          <h4 className="card-text">
            {data.name} {data.lastName}
          </h4>
          <p className="card-text">Category: {data.category}</p>
          <p className="card-text">
            Workshop: {data.workshop}, {data.city}
          </p>
          <p className="card-text">Experience: {data.experience}</p>

          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <Link to={`/masters/${data.url_slug}`} className="btn btn-sm btn-outline-secondary">
                View all {data.category}'s
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
