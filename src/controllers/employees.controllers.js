import { pool } from "../db.js";

// obtener todos --------------------------------------------------------------
export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees");
    res.send(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal" });
  }
};

// obtener por id ------------------------------------------------------------
export const getEmployee = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM employees WHERE id = ?", [
    req.params.id,
  ]);

  if (rows.length <= 0) return res.status(404).json({ message: "Not found" });

  res.json(rows[0]);
};

// crear ---------------------------------------------------------------------
export const createEmployee = async (req, res) => {
  // 1. extraer datos del body
  const { name, salary } = req.body;

  try {
    // 2. guardar en la base de datos
    const [rows] = await pool.query(
      "INSERT INTO EMPLOYEES (name, salary) VALUES (?, ?)",
      [name, salary]
    );

    // 3. response
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal" });
  }
};

// eliminar --------------------------------------------------------------------------
export const deleteEmployee = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM employees WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "Not found" });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal" });
  }
};

export const updateEmployee = async (req, res) => {
  //const id = req.params.id;
  const { id } = req.params;
  const { name, salary } = req.body;

  try {
    // IFNULL, si el valor es null, no lo actualiza
    const [result] = await pool.query(
      "UPDATE employees SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );

    //console.log(result.info);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Not found" });

    //res.send(result.info);
    const [rows] = await pool.query("SELECT * FROM employees WHERE id = ?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal" });
  }
};
