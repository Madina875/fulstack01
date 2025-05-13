const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const indexRouter = require("./routes/index.routes");

const PORT = process.env.PORT || 3030;
const app = express();
app.use(express.json());

app.use("/api", indexRouter); //backend
// app.use("/", indexFrontRouter);//frontend

app.listen(PORT, () => {
  console.log(`server started at: http://localhost:${PORT}`);
});


//foreighn key, pagination
