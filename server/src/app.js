require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');

// const tasksRouter = require('./routers/tasks.api.router');
const authRouter = require('./routers/auth.router');
const tokenRouter = require('./routers/token.router');

const channelsRouter = require('./routers/channels.api.router');
const subscriptionsRouter = require('./routers/subscriptions.api.router');
const userRouter = require('./routers/user.api.router');

const app = express();
const { PORT } = process.env;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));

// app.use('/api/tasks', tasksRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/tokens', tokenRouter);
app.use('/api/channels', channelsRouter);
app.use('/api/subscriptions', subscriptionsRouter);



app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});


app.use('*', (req, res) => {
	res.redirect('/');
});