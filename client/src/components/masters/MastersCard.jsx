import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { UserContext } from "../../context/user/UserContext";

export function MastersCard({ data }) {
  const { userId, isLoggedIn } = useContext(UserContext);
  const [liked, setLiked] = useState(data.heartColor === "1");
  const [likesCount, setLikesCount] = useState(+data.likesCount);

  const handleClick = async () => {
    const action = liked ? -1 : 1;
    const newLiked = !liked;

    setLiked(newLiked);
    setLikesCount((prev) => prev + action);

    if (!isLoggedIn) return;
    try {
      await fetch("http://localhost:5439/api/admin/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          master_id: data.id,
          user_id: userId,
          like_change: action,
        }),
      });
    } catch (err) {
      console.error("Nepavyko atnaujinti like:", err);
      // Atstatyk į pradinę būseną, jei nepavyko
      setLiked(!newLiked);
      setLikesCount((prev) => prev - action);
    }
  };

  return (
    <div className="col">
      <div className="card shadow-sm">
        <div className="photo">
          <img
            src={"http://localhost:5439/img/masters/" + data.img}
            alt="Photo"
            className="bd-placeholder-img card-img-top"
          />
          <div className="likeCount">{likesCount}</div>
          <FontAwesomeIcon
            onClick={handleClick}
            className={`clickHeart fa ${liked ? "heartColor" : ""}`}
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
