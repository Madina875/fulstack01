const { sendErrorResponse } = require("../helpers/send_error_response");
const Author = require("../schemas/Author");
const { aurValidation } = require("../validation/aur.validation");

const config = require("config"); //default jsonnning ichidan malumotni chiqarib olish un kk
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const create = async (req, res) => {
  try {
    const { error, value } = aurValidation(req.body);

    if (error) {
      return sendErrorResponse(error, res);
    }

    const hashedPassword = bcrypt.hashSync(value.password, 7);

    const newAuthor = await Author.create({
      ...value,
      password: hashedPassword,
    });

    res.status(201).send({ message: "New author added", newAuthor });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const author = await Author.find();
    res.status(200).send(author);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const author = await Author.findById(id);
    res.status(200).send(author);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    await Author.findByIdAndDelete(id);
    res.status(200).send({ message: "author deleted successfilly✅" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

async function update(req, res) {
  let data = req.body;
  let { id } = req.params;
  try {
    let updateAuthor = await Author.findByIdAndUpdate(id, data);
    res.status(200).send({ data: updateAuthor });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

const loginAuthor = async (req, res) => {
  try {
    const { email, password } = req.body;
    //ident
    const author = await Author.findOne({ email });
    if (!author) {
      return res
        .status(401)
        .send({ message: "email or password is incorrect" });
    }
    console.log(author);

    //auth
    const validPassword = bcrypt.compareSync(password, author.password);
    if (!validPassword) {
      return res
        .status(401)
        .send({ message: "email or password is incorrect" });
    }

    //token kalit berib yuborish :
    const payload = {
      id: author._id,
      email: author.email,
      is_active: author.is_active,
      is_export: author.is_export,
    };

    const token = jwt.sign(payload, config.get("tokenKey"), {
      expiresIn: config.get("tokenExpTime"),
    });

    res.status(201).send({ message: "welcome", id: author.id, token });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
  loginAuthor,
  // register,
};
