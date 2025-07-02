import { connection } from "../../server/db.js";

export async function getAllMasters(req, res) {
  try {
    const loginToken = req.cookies?.loginToken;

    if (!loginToken) {
      res.status(401).json({ error: "No login token" });
    }

    const [tokenResult] = await connection.execute(
      `
      SELECT user_id
      FROM tokens
      WHERE text = ?`,
      [loginToken]
    );

    if (tokenResult.length === 0) {
      res.status(401).json({ error: "Invalid login token" });
    }

    const userId = tokenResult[0].user_id;

    const sql = `
        SELECT masters.*, categories.category, categories.url_slug, workshops.workshop, city,
            (SELECT SUM(like_count) FROM likes
              WHERE likes.master_id = masters.id) AS likesCount,
                    (SELECT 
                  SUM(like_count)  
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

// const loginToken = req.cookies?.loginToken ?? null;
// let userId = 0;

// if (loginToken) {
//   const [tokenResult] = await connection.execute(
//     `SELECT user_id FROM tokens WHERE text = ?`,
//     [loginToken]
//   );

//   if (tokenResult.length > 0) {
//     userId = tokenResult[0].user_id;
//   }
// }

// const sql = `
//   SELECT masters.*, categories.category, categories.url_slug, workshops.workshop, city,
//     (SELECT SUM(like_count) FROM likes WHERE likes.master_id = masters.id) AS likesCount,
//     (SELECT IFNULL(SUM(like_count), 0)
//      FROM likes
//      WHERE likes.user_id = ? AND likes.master_id = masters.id) AS heartColor
//   FROM masters
//   INNER JOIN categories ON masters.category_id = categories.id
//   INNER JOIN workshops ON masters.workshop_id = workshops.id
//   WHERE masters.is_published = 1 AND categories.is_published = 1
// `;

// const [result] = await connection.execute(sql, [userId]);
// ✅ Rezultatas
// Jei prisijungęs vartotojas – gaus heartColor = like_count, jei tokie yra.

// Jei neprisijungęs – userId = 0, nieko neranda, bet heartColor vis tiek bus 0 dėl IFNULL(...).

// export async function getAllMasters(req, res) {
//   try {
//     const sql = `
//       SELECT masters.*, categories.category, categories.url_slug, workshops.workshop, city
//       FROM masters
//       INNER JOIN categories ON masters.category_id = categories.id
//       INNER JOIN workshops ON masters.workshop_id = workshops.id
//       WHERE masters.is_published = 1 AND categories.is_published = 1
//     `;

//     const likesSql = `
//       SELECT master_id, user_id, like_count FROM likes
//     `;

//     const [masters] = await connection.execute(sql);
//     const [likes] = await connection.execute(likesSql);

//     return res.json({
//       status: "success",
//       masters,
//       likes,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ status: "error", masters: [], likes: [] });
//   }
// }
