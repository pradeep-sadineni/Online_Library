if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(
  bodyParser.urlencoded({
    limit: '10mb',
    extended: false
  })
);
app.use(methodOverride('_method'));

mongoose.connect(process.env.DATABASE_URL || "mongodb+srv://pradeepsadineni2003:23102003@books.4kctcqf.mongodb.net/?retryWrites=true&w=majority&appName=Books", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('Error connecting to MongoDB:', error);
});

app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);

app.listen(process.env.PORT || 3000);
