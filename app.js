const express = require('express');
const app = express();
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

// middleware
app.use(express.json());
app.use(express.static('./public'));

//routes
app.get('/xmldata', (req, res) => {
    var xmlfile = "./public/books.xml";
    fs.readFile(xmlfile, "utf-8", function (error, text) {
        if (error) {
            throw error;
        } else {
            parser.parseString(text, function (err, result) {
                var books = result['bookstore']['book'];
                res.send({ books: books });
            });
        }
    });
});
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 7000;

const start = async () => {
    try {
        // await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log('server is listening on port ', port));

    } catch (error) {
        console.log('error is ', error);

    }
};

start();
//  $env:PORT=5000  command to change  the port