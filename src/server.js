const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const chatRouter = require('./routes/chat.route');
const mongoose = require('mongoose');

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.options('*', cors());

const port = Number(process.env.PORT_SERVER || 3331);

app.use(`/api/v1`, chatRouter);

// 404 error
app.all('*', (req, res, next) => {
  const err = new HttpException(404, 'Endpoint Not Found');
  next(err);
});

async function main() {
  await mongoose.connect(process.env.DB_CONNECT);
  console.log('mongodb connected');
}

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}!`);
  main().catch(err => console.log(err));
});

module.exports = app;
