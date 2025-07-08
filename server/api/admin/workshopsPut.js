import { connection } from "../../db.js";
import { IsValid } from "../../lib/IsValid.js";

export async function workshopsPut(req, res) {
  const [errParams, msgParams] = IsValid.requiredFields(req.params, [{ field: "id", validation: IsValid.idAsString }]);

  if (errParams) {
    return res.json({
      status: "error",
      msg: msgParams,
    });
  }

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
    const sql = `
            UPDATE workshops
            SET workshop = ?, city = ?, adress = ?
            WHERE id = ?;`;
    const [result] = await connection.execute(sql, [workshop, city, adress, +req.params.id]);

    if (result.affectedRows !== 1) {
      return res.json({
        status: "error",
        msg: "Serverio klaida, pabandykite atnaujinti veliau",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      msg: "Serverio klaida, pabandykite atnaujinti veliau",
    });
  }

  return res.json({
    status: "success",
    msg: "Serviso informacija atnaujinta sekmingai",
  });
}
