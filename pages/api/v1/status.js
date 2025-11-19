import database from "../../../infra/database";

async function status(req, res) {
  const result = await database.query("SELECT 1+1 AS result");
  console.log(result.rows[0]);
  res.status(200).json({ status: "Vai dar certo, vaga na gringa" });
}

export default status;
