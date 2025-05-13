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
  db.query(`select * from contracts LIMIT ?`, [limit], (error, result) => {
    if (error) {
      sendErrorResponse(error, res);
    }
    res.send(result);
  });
};

const getById = (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM contracts where id=${id}`, (error, result) => {
    if (error) {
      sendErrorResponse(error, res);
    }
    res.send(result);
  });
};

const create = (req, res) => {
  const {
    laptop_id,
    customer_id,
    full_price,
    start_date,
    end_date,
    amount_month,
    start_price,
  } = req.body;
  db.query(
    `INSERT INTO contracts
    (laptop_id, customer_id, full_price, start_date, end_date, amount_month, start_price)
    VALUES(?,?,?,?,?,?,?)
    `,
    [
      laptop_id,
      customer_id,
      full_price,
      start_date,
      end_date,
      amount_month,
      start_price,
    ],
    (error, result) => {
      console.log(req);
      if (error) {
        res.status(500).send({ message: `${err.message}` });
      }
      res.status(201).send({
        message: "Yangi contract qoshilid",
        contractId: result.insertId,
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
    `update contracts set ${updateValue} where id=?`,
    [...values, id],
    (err, result) => {
      if (err) {
        res.status(500).send({ message: `${err.message}` });
      }
      res.status(200).send({ message: "contract updated successfully" });
    }
  );
};

const remove = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM contracts where id=?`, [id], (err, result) => {
    if (err) {
      sendErrorResponse(err, res);
    }
    res.status(200).send({ message: "contract deleted successfully" });
  });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
