import { connection } from "../../db.js";

export async function getAllCategories(req, res) {
  try {
    const sql = `
            SELECT *,
                ( 
                    SELECT COUNT(*)
                    FROM masters
                    WHERE masters.category_id = categories.id AND masters.is_published = 1
                ) AS count
            FROM categories
            WHERE is_published = 1
            ORDER BY category;`;
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
