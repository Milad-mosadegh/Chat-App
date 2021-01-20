var createError = require('http-errors');
var express = require('express');
var app = express();
var mongoose = require('mongoose')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
require('dotenv').config()


var usersRouter = require('./routes/users');


mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => { console.log("Connected to MongoDB") })

var port = process.env.PORT || '8000';

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));
}
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;