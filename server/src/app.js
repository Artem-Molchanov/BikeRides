/* eslint-disable no-undef */

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');


const authRouter = require('./routers/auth.router');
const tokenRouter = require('./routers/token.router');

const routeRouter = require('./routers/routes.api.router')
const reviewRouter = require('./routers/reviews.api.router');
const scoreRouter = require('./routers/scores.api.router');
const trackRouter = require('./routers/track.router');

const app = express();
const { PORT } = process.env;

const corsConfig = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/api/auth', authRouter);
app.use('/api/tokens', tokenRouter);
app.use('/api/routes', routeRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/scores', scoreRouter);
app.use('/api/track', trackRouter);



app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});


app.use('*', (req, res) => {
	res.redirect('/');
});