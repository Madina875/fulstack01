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
  db.query(`select * from payments LIMIT ?`, [limit], (error, result) => {
    if (error) {
      sendErrorResponse(error, res);
    }
    res.send(result);
  });
};

const getById = (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM payments where id=${id}`, (error, result) => {
    if (error) {
      sendErrorResponse(error, res);
    }
    res.send(result);
  });
};

const create = (req, res) => {
  const { customer_id, status, contract_id, payment_method } = req.body;
  db.query(
    `INSERT INTO payments (customer_id, status, contract_id, payment_method) VALUES(?,?,?,?)
    `,
    [customer_id, status, contract_id, payment_method],
    (error, result) => {
      if (error) {
        sendErrorResponse(error, res);
      }
      res.status(201).send({
        message: "Yabgi payments qoshilid",
        paymentsId: result.insertId,
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
    `update payments set ${updateValue} where id=?`,
    [...values, id],
    (err, result) => {
      if (err) {
        res.status(500).send({ message: `${err.message}` });
      }
      res.status(200).send({ message: "payments updated successfully" });
    }
  );
};

const remove = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM payments where id=?`, [id], (err, result) => {
    if (err) {
      sendErrorResponse(err, res);
    }
    res.status(200).send({ message: "payments deleted successfully" });
  });
};

// -----------------------------------------------------------------------------------------

const getTimeoutProducts = (req, res) => {
  db.query(
    `SELECT p.id, c.first_name, p.status,
    con.amount_month, con.full_price, con.start_date, con.end_date, con.start_price, p.payment_method
    FROM payments p
    LEFT JOIN customers c ON p.id = c.id
    LEFT JOIN contracts con ON p.id = con.id
    where con.end_date < CURRENT_TIMESTAMP and p.status="PEDDING"`,
    (error, result) => {
      if (error) {
        sendErrorResponse(error, res);
      }
      res.send(result);
    }
  );
};

const getSelledProducts = (req, res) => {
  const { start_date, end_date } = req.body;
  if (!start_date || !end_date) {
    return res.status(400).send({ message: "start_date va end_date needful" });
  }
  db.query(
    `SELECT 
  p.id,c.first_name,p.status,con.amount_month, con.full_price, con.start_date,con.end_date,con.start_price,p.payment_method 
  FROM payments p
  LEFT JOIN customers c ON p.id = c.id
  LEFT JOIN contracts con ON p.id = con.id
  WHERE p.status = 'FULFILLED'
  AND con.end_date BETWEEN ? AND ? `,
    [start_date, end_date],
    (error, result) => {
      if (error) {
        sendErrorResponse(error, res);
      }
      res.send(result);
    }
  );
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  getTimeoutProducts,
  getSelledProducts,
};
