const { sendErrorResponse } = require("../helpers/send_error_response");
const User = require("../schemas/User");
const { userValidation } = require("../validation/user.validation");

const config = require("config"); //default jsonnning ichidan malumotni chiqarib olish un kk
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtService = require("../service/jwt.service");

const create = async (req, res) => {
  try {
    const { error, value } = userValidation(req.body);
    if (error) {
      return sendErrorResponse(error, res);
    }
    const hashedPassword = bcrypt.hashSync(value.password, 7);
    const newUser = await User.create({
      ...value,
      password: hashedPassword,
    });
    res.status(201).send({ message: "New user added", newUser });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const user = await User.findById(id);
    res.status(200).send(user);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).send({ message: "user deleted successfilly✅" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

async function update(req, res) {
  let data = req.body;
  let { id } = req.params;
  try {
    let updateUser = await User.findByIdAndUpdate(id, data);
    res.status(200).send({ data: updateUser });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    //ident
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).send({ message: "name or password is incorrect" });
    }
    console.log(user);

    //auth
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: "name or password is incorrect" });
    }

    //token kalit berib yuborish :
    const payload = {
      id: user._id,
      is_active: user.is_active,
      name: user.name,
    };

    // const token = jwt.sign(payload, config.get("userTokenKey"), {
    //   expiresIn: config.get("tokenExpTime"),
    // });

    const tokens = jwtService.generateTokens(payload);
    user.refresh_token = tokens.refreshToken;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });

    res.status(201).send({ message: "welcome", id: user.id, tokens });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const logoutUser = async (req, res) => {
  try {
    console.log(req.cookies);
    console.log(req.headers.cookie);

    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "cookieda refresh token topilmadi" });
    }

    const user = await Admin.findOneAndUpdate(
      { refresh_token: refreshToken },
      { refresh_token: "" },
      { new: true }
    );
    if (!user) {
      return res.status(400).send({ message: "Token notogri" });
    }

    res.clearCookie("refreshToken");
    res.send({ admin });
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
  loginUser,
  logoutUser,
};
