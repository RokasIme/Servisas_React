import { connection } from "../../server/db.js";

export async function getAllMasters(req, res) {
  try {
    const sql = `
        SELECT masters.*, categories.category, categories.url_slug, workshops.workshop, city
        FROM masters
        INNER JOIN categories
        ON masters.category_id = categories.id
        INNER JOIN workshops
        ON masters.workshop_id = workshops.id
        WHERE masters.is_published = 1 AND categories.is_published = 1 `;
    const [result] = await connection.execute(sql);

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
