require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const mongoose = require('mongoose');
mongoose.set("strictQuery", true);
require("./config/database");
const apiRouter = require("./routes/index");
// const todosRouter = require("./routes/todos");

app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use('/api/v1', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));