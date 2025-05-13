const sendErrorResponse = (error, res) => {
  console.log(error);

  res.status(400).send({ message: "xatolik", error: error });
};

module.exports = {
  sendErrorResponse,
};
