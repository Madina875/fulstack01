const Joi = require("joi");
const { sendErrorResponse } = require("../helpers/send_error_response");
const Dict = require("../schemas/Dict");
const { dictValidation } = require("../validation/dict.validation");

const create = async (req, res) => {
  try {
    const { error, value } = dictValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }
    const { term } = value;
    const newDict = await Dict.create({ term, letter: term[0] });
    res.status(201).send({ message: "New dictionary added", newDict });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const dicts = await Dict.find();
    res.status(200).send({ dicts });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const dict = await Dict.findById(id);
    res.status(200).send({ dict });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    await Dict.findByIdAndDelete(id);
    res.status(200).send({ message: "Dictionary deleted successfilly✅" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

async function update(req, res) {
  let data = req.body;
  let { id } = req.params;
  try {
    let updateDict = await Dict.findByIdAndUpdate(id, data);
    res.status(200).send({ data: updateDict });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

module.exports = { create, getAll, getById, remove, update };
