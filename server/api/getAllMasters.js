import { connection } from "../../server/db.js";

export async function getAllMasters(req, res) {
  try {
    const loginToken = req.cookies?.loginToken ?? null;
    let userId = 0;
    let tokenResult = [];

    if (loginToken) {
      [tokenResult] = await connection.execute(
        `
        SELECT user_id
        FROM tokens
        WHERE text = ?`,
        [loginToken]
      );
    }

    if (tokenResult.length > 0) {
      userId = tokenResult[0].user_id;
    }

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
        WHERE masters.is_published = 1 AND categories.is_published = 1 `;
    const [result] = await connection.execute(sql, [userId]);

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
