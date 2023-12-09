const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const docsRouter = require('./routes/documents')

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.use('/documents', docsRouter)

// Define a route for the root URL
app.get('/', (req, res) => {
  // Render the list of documents and create document link
  res.render('index')
});

app.listen(3000, () => {
    console.log('Server is running on port 3000')
  });

module.exports = app