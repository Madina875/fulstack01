const pool = require("../config/db");
const { sendErrorResponse } = require("../helpers/send_error_response");

const add = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newStage = await pool.query(
      `
        INSERT INTO stage (name,description)
        values ($1,$2) RETURNING *
        `,
      [name, description]
    );
    console.log(newStage);

    res.status(201).send(newStage.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const stage = await pool.query(`select * from stage `);
    console.log(stage);
    res.status(200).send(stage.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const stage = await pool.query(
      "select FROM stage WHERE id = $1 RETURNING *",
      [id]
    );
    console.log(stage);
    res.status(200).send(stage.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const id = req.params.id;

    const stage = await pool.query(
      "DELETE FROM stage WHERE id = $1 RETURNING *",
      [id]
    );

    if (stage.rowCount === 0) {
      return res.status(404).json({ message: "Stage not found" });
    }

    res.status(200).json(stage.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const update = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;

    const updateStage = await pool.query(
      `UPDATE stage
        SET name = $1, description = $2
        WHERE id = $3
        RETURNING *
      `,
      [name, description, id]
    );

    if (updateStage.rowCount === 0) {
      return res.status(404).json({ message: "Stage not found" });
    }

    res.status(200).json(updateStage.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = { add, getAll, getById, remove, update };
