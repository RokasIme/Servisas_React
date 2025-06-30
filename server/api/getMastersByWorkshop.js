import { connection } from "../db.js";

// Logged in user ID  from context kai jis bus

export async function getMastersByWorkshop(req, res) {
  console.log(req);
  try {
    const sql = `
        SELECT masters.*, categories.category, categories.url_slug, workshops.workshop, city,
            (SELECT SUM(like_count) FROM likes
              WHERE likes.master_id = masters.id) AS likesCount,
                    (SELECT 
                  SUM(like_count)  
                  FROM likes
                  WHERE likes.user_id = 4 AND likes.master_id = masters.id) AS heartColor
        FROM masters
        INNER JOIN categories
        ON masters.category_id = categories.id
        INNER JOIN workshops
        ON masters.workshop_id = workshops.id
        WHERE masters.is_published = 1 AND categories.is_published = 1 AND masters.workshop_id = ?`;
    const [result] = await connection.execute(sql, [req.params.category]);

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
