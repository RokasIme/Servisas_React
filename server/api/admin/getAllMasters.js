import { connection } from "../../db.js";

export async function getAllMasters(req, res) {
  try {
    const sql = `
        SELECT masters.*, categories.category, categories.url_slug, workshops.workshop, city,
            (SELECT SUM(like_count) FROM likes
              WHERE likes.master_id = masters.id) AS likesCount,
                    (SELECT 
                  IFNULL(SUM(like_count), 0)  
                  FROM likes
                  WHERE likes.user_id=? AND likes.master_id = masters.id) AS heartColor
        FROM masters
        INNER JOIN categories
        ON masters.category_id = categories.id
        INNER JOIN workshops
        ON masters.workshop_id = workshops.id
        `;
    const [result] = await connection.execute(sql, [req.user.id]);

    return res.json({
      status: "success",
      list: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: "error",
      list: [],
      msg: "Serverio klaida",
    });
  }
}
