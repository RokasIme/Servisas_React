import { connection } from "../../db.js";
import { IsValid } from "../../lib/IsValid.js";

export async function mastersPost(req, res) {
  const [err, msg] = IsValid.requiredFields(
    req.body,
    [
      { field: "name", validation: IsValid.nonEmptyString },
      { field: "lastName", validation: IsValid.nonEmptyString },
    ],
    [
      { field: "img", validation: IsValid.nonEmptyString },
      { field: "category", validation: IsValid.nonEmptyString },
      { field: "experience", validation: IsValid.nonEmptyString },
      { field: "workshop", validation: IsValid.nonEmptyString },
      { field: "status", validation: IsValid.includesInList, options: ["draft", "publish"] },
    ]
  );

  if (err) {
    return res.json({
      status: "error",
      msg: msg,
    });
  }

  const { img, name, lastName, category, experience, workshop, status } = req.body;

  let categoryId = 0;

  try {
    const sql = "SELECT * FROM categories WHERE url_slug = ?;";
    const [result] = await connection.execute(sql, [category]);

    if (result.length !== 1) {
      return res.status(400).json({
        status: "error",
        msg: "Tokia kategorija neegzistuoja.",
      });
    }

    categoryId = result[0].id;
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      msg: "Serverio klaida, pabandykite meistrą sukurti veliau1",
    });
  }

  let workshopId = 0;

  try {
    const sql = "SELECT * FROM workshops WHERE workshop = ?;";
    const [result] = await connection.execute(sql, [workshop]);

    if (result.length !== 1) {
      return res.status(400).json({
        status: "error",
        msg: "Toks servisas neegzistuoja.",
      });
    }

    workshopId = result[0].id;
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      msg: "Serverio klaida, pabandykite meistrą sukurti veliau1",
    });
  }

  try {
    const sqlColumns = ["name", "lastName", "is_published"];
    const sqValues = [name, lastName, status === "publish" ? 1 : 0];
    if (img) {
      sqlColumns.push("img");
      sqValues.push(img);
    }
    if (experience) {
      sqlColumns.push("experience");
      sqValues.push(experience);
    }
    if (category) {
      sqlColumns.push("category_id");
      sqValues.push(categoryId);
    }
    if (workshop) {
      sqlColumns.push("workshop_id");
      sqValues.push(workshopId);
    }

    const sql = `INSERT INTO masters (${sqlColumns.join(", ")}) VALUES (?${", ?".repeat(sqlColumns.length - 1)});`;
    const [result] = await connection.execute(sql, sqValues);

    if (result.affectedRows !== 1) {
      return res.json({
        status: "error",
        msg: "Serverio klaida, pabandykite meistrą sukurti veliau2",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      msg: "Serverio klaida, pabandykite meistrą sukurti veliau3",
    });
  }

  return res.json({
    status: "success",
    msg: "Meistras sukuras sekmingai",
  });
}
