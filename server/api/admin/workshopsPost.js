import { connection } from "../../db.js";
import { IsValid } from "../../lib/IsValid.js";

export async function workshopsPost(req, res) {
  const [err, msg] = IsValid.requiredFields(req.body, [
    { field: "workshop", validation: IsValid.nonEmptyString },
    { field: "city", validation: IsValid.nonEmptyString },
    { field: "adress", validation: IsValid.nonEmptyString },
  ]);

  if (err) {
    return res.json({
      status: "error",
      msg: msg,
    });
  }

  const { workshop, city, adress } = req.body;

  try {
    const sql = "SELECT * FROM workshops WHERE workshop = ?  AND id != ?;";
    const [result] = await connection.execute(sql, [workshop, +req.params.id]);

    if (result.length > 0) {
      return res.json({
        status: "error",
        msg: "Tokiu pavadinimu servisas jau egzistuoja.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      msg: "Serverio klaida, pabandykite servisą atnaujinti veliau",
    });
  }

  try {
    const sql = "INSERT INTO workshops (workshop, city, adress) VALUES (?, ?, ?);";
    const [result] = await connection.execute(sql, [workshop, city, adress]);

    if (result.affectedRows !== 1) {
      return res.json({
        status: "error",
        msg: "Serverio klaida, pabandykite sukurti veliau",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      msg: "Serverio klaida, pabandykite sukurti veliau",
    });
  }

  return res.json({
    status: "success",
    msg: "Sukurta nauja serviso eilutė",
  });
}
