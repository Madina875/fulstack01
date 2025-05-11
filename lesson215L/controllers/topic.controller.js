const { sendErrorResponse } = require("../helpers/send_error_response");
const Topic = require("../schemas/Topic");
const { topicValidation } = require("../validation/topic.validation");

const create = async (req, res) => {
  try {
    const { error, value } = topicValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const data = value;
    console.log(value);
    const newAuthor = await Topic.create(data); // create i o'chirildi

    res.status(201).send({ message: "New author added", newAuthor });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const author = await Topic.find();
    res.status(200).send({ author });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const author = await Topic.findById(id).populate("author_id");
    res.status(200).send({ author });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    await Topic.findByIdAndDelete(id);
    res.status(200).send({ message: "author deleted successfilly✅" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

async function update(req, res) {
  let data = req.body;
  let { id } = req.params;
  try {
    let updateAuthor = await Topic.findByIdAndUpdate(id, data);
    res.status(200).send({ data: updateAuthor });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

module.exports = { create, getAll, getById, remove, update };
