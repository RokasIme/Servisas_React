import { connection } from "../db.js";

export async function getAllWorkshops(req, res) {
  try {
    const sql = `
             SELECT *
            FROM workshops
            `;
    const [result] = await connection.execute(sql);
    return res.json({
      status: "success",
      list: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: "error",
      data: [],
      msg: "Serverio klaida",
    });
  }
}
