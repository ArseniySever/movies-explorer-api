const express = require('express');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const cors = require('cors');
const error = require('./middlewares/error');
const { limiter } = require('./middlewares/limitRequest');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const constants = require('./utils/constants');
const router = require('./routes/index');

const { PORT = constants.PORT, DB_URL = constants.DB_URL } = process.env;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  });

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({ origin: 'https://domainname.students.nomoredomains.work', credentials: true }));
app.use(helmet());
app.use(requestLogger);
app.use(limiter);

app.use(router);
app.use(errorLogger);
app.use(errors());

app.use(error);

app.listen(PORT);
