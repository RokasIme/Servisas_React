import { Link } from "react-router";
// import { getAllLikes, getHeartColor } from "../../../../server/api/likes";

export function MastersCard({ data }) {
  // const likesObj = await getAllLikes(data.id);
  // let likes = likesObj[0].sum;
  // likes === null ? (likes = 0) : likes;

  // const user_id = this.req.user.id;
  // const result = await getHeartColor(user_id, data.id);
  // const like = +result[0]?.sum ? +result[0].sum : 0;

  return (
    <div className="col">
      <div className="card shadow-sm">
        <div className="photo">
          <img
            className="bd-placeholder-img card-img-top"
            src={"http://localhost:5439/img/masters/" + data.img}
            alt="Photo"
          />
          {/* <div data-count={`${data.id}`} className="like-count">
            {likes}
          </div>
          <i
            data-push={`${data.id}`}
            className={` ${like === 1 ? "heartColor" : ""} clickHeart fa fa-heart`}
            aria-hidden="true"
          ></i> */}
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
