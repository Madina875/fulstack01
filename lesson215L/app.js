const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const PORT = config.get("port") || 3030;

const app = express();
app.use(express.json());

const indexRouter = require("./routes/index.routes");

app.use("/api", indexRouter);

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
