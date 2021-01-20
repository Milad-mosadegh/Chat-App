var express = require('express');
var router = express.Router();

const MongoClient = require("mongodb").MongoClient; // import class MongoClient that helps to connect to database.


/* GET users listing. */
router.post('/send', function (req, res, next) {
  let data = req.body
  console.log(data);
  MongoClient.connect(process.env.URL, { useUnifiedTopology: true }, (err, con) => {
    let userMessage = con.db('usermessage');
    userMessage.collection('messages').insertOne(data, (err, result) => {
      if (err) throw err;
      res.send(result);
      con.close()
    })
  })
});


router.get('/recive', (req, res) => {
  MongoClient.connect(process.env.URL, { useUnifiedTopology: true }, (err, con) => {
    if (err) throw err;
    let userMessage = con.db('usermessage');

    userMessage.collection('messages')
      .find()
      .toArray((err, result) => {
        if (err) throw err
        res.send(result)
        con.close()
      })
  })
})




module.exports = router;
