const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");
const sendErrorResponse = require("../helpers/send_error_response");

//pagi

const getAll = (req, res) => {
  const limitParam = req.query.limit;
  const limit = parseInt(limitParam, 10);

  if (isNaN(limit) || limit <= 0 || limit > 1000) {
    return res
      .status(400)
      .send({ message: "limit must be a positive number between 1 and 1000" });
  }

  db.query(`select * from brands LIMIT ?`, [limit], (error, result) => {
    if (error) {
      sendErrorResponse(error, res);
    }
    res.send(result);
  });
};

const getById = (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM brands where id=${id}`, (error, result) => {
    if (error) {
      sendErrorResponse(error, res);
    }
    res.send(result);
  });
};

const create = (req, res) => {
  const { name } = req.body;
  db.query(
    `
    INSERT INTO brands (name) VALUES(?)
    `,
    [name],
    (error, result) => {
      if (error) {
        sendErrorResponse(error, res);
      }
      res
        .status(201)
        .send({ message: "Yangi brand qoshilid", brandId: result.insertId });
    }
  );
};

const update = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  let updateValue = queryGenerate(data);
  let values = Object.values(data);
  db.query(
    `update brands set ${updateValue} where id=?`,
    [...values, id],
    (err, result) => {
      if (err) {
        res.status(500).send({ message: `${err.message}` });
      }
      res.status(200).send({ message: "brand updated successfully" });
    }
  );
};

const remove = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM brands where id=?`, [id], (err, result) => {
    if (err) {
      sendErrorResponse(err, res);
    }
    res.status(200).send({ message: "brand deleted successfully" });
  });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
