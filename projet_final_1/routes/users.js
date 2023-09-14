var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDb = "mongodb://127.0.0.1/projet_final_1";
const usersModel = require("../users/usersModel");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cool/', function(req, res, next) {
  res.send('You\'re so cool!');
});

router.get('/connection/:userName/', async function(req, res, next) {
  try{
    const user = req.params.userName;
    if(/[0-9a-zA-Z_]+/.test(user)){
      // Request datas from database.
      
      //main().catch((err) => console.log(err));
      await mongoose.connect(mongoDb);
      // Use the SomeModel object (model) to find all SomeModel records
      const usersInstances = await usersModel.find(
        { userName: new RegExp(user, "i") }, //Could use regex here.
        "userName age",
      ).exec();

      // console.log("searchResults : " + usersInstances);
      res.send('Page connection - user : ' + usersInstances);
      
    } else {
      //NB : currently unreachable.
      res.send('Erreur : typo dans user détecté.');
    }
  } catch (error) {

    return next(error);
  }
  res.send('Page connection : //!\\ work in progress //!\\.');
});

router.post('/connection2/', async function(req, res, next) {
  try{
    let user = req.body.userName;
    if(/[0-9a-zA-Z_]+/.test(user)){
      // Request datas from database.
      console.log("user : " + user);
      let secureUser = /([0-9a-zA-Z_]+)/.exec(user)[1];
      console.log("secureUser : " + secureUser);
      //main().catch((err) => console.log(err));
      await mongoose.connect(mongoDb);
      // Use the SomeModel object (model) to find all SomeModel records
      const usersInstances = await usersModel.find(
        { userName: new RegExp(user, "i") }, //Could use regex here.
        "userName age",
      ).exec();

      // console.log("searchResults : " + usersInstances);
      res.send({usersInstances: usersInstances});
      
    } else {
      res.send('Erreur : typo dans user détecté.');
    }
  } catch (error) {

    return next(error);
  }
  //res.send('Page connection : //!\\ work in progress //!\\.');
});

router.get('/inscription/', function(req, res, next) {
  res.send('Page inscription : //!\\ work in progress //!\\.');
});

router.post('/inscription/', function(req, res, next) {
  res.send('Page inscription (post) : //!\\ work in progress //!\\.');
});

router.post('/deconnection/', function(req, res, next) {
  res.send('Page deconnection : //!\\ work in progress //!\\.');
});

router.post('/desincription/', function(req, res, next) {
  res.send('Page desinscription : //!\\ work in progress //!\\.');
});

router.get('/:id/', function(req, res, next) {
  //id doit être un word character ([0-9a-zA-Z_]).
  res.send('id: ' + req.params.id);
});

module.exports = router;
