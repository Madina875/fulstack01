const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");
const sendErrorResponse = require("../helpers/send_error_response");

const getAll = (req, res) => {
  const limitParam = req.query.limit;
  const limit = parseInt(limitParam, 10);

  if (isNaN(limit) || limit <= 0 || limit > 1000) {
    return res
      .status(400)
      .send({ message: "limit must be a positive number between 1 and 1000" });
  }
  db.query(`select * from laptops LIMIT ?`, [limit], (error, result) => {
    if (error) {
      sendErrorResponse(error, res);
    }
    res.send(result);
  });
};

const getById = (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM laptops where id=${id}`, (error, result) => {
    if (error) {
      sendErrorResponse(error, res);
    }
    res.send(result);
  });
};

const create = (req, res) => {
  const { name, category_id, photo_id, brand_id, model_id } = req.body;
  db.query(
    `INSERT INTO laptops (name, category_id, photo_id, brand_id, model_id) VALUES(?,?,?,?,?)
    `,
    [name, category_id, photo_id, brand_id, model_id],
    (error, result) => {
      if (error) {
        sendErrorResponse(error, res);
      }
      res.status(201).send({
        message: "Yabgi laptops qoshilid",
        laptopsId: result.insertId,
      });
    }
  );
};

const update = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  let updateValue = queryGenerate(data);
  let values = Object.values(data);
  db.query(
    `update laptops set ${updateValue} where id=?`,
    [...values, id],
    (err, result) => {
      if (err) {
        res.status(500).send({ message: `${err.message}` });
      }
      res.status(200).send({ message: "laptops updated successfully" });
    }
  );
};

const remove = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM laptops where id=?`, [id], (err, result) => {
    if (err) {
      sendErrorResponse(err, res);
    }
    res.status(200).send({ message: "laptops deleted successfully" });
  });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
