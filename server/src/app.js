require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');


const authRouter = require('./routers/auth.router');
const tokenRouter = require('./routers/token.router');

const routeRouter = require('./routes/route');
const reviewRouter = require('./routes/review');
const scoreRouter = require('./routes/score');

const app = express();
const { PORT } = process.env;

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



app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});


app.use('*', (req, res) => {
	res.redirect('/');
});