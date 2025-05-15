const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");

const PORT = config.get("port") || 3030;

//process.on("<turli signallar mavjud>")


// process.on("uncaughtException", (exception) => {
//   console.log("uncaughtException: ", exception.message);
// });

// process.on("unhandledRejection", (rejection) => {
//   console.log("unhandledRejection: ", rejection);
// });


const app = express();
app.use(express.json());
app.use(cookieParser()); //parse //xatolar frontdan chiqsa shu yerdan chiqadi  va eng ohirida error handler bolsa shunga boradi

const indexRouter = require("./routes/index.routes"); // backend
const errorHandlingMiddleware = require("./middleware/errors/error-handling.middleware");

app.use("/api", indexRouter);
app.use(errorHandlingMiddleware); // error handling eng oohirida  yozilishi kk

async function start() {
  try {
    const uri = config.get("dbUri");
    await mongoose.connect(uri);
    app.listen(PORT, () => {
      console.log(`server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
