//security import
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookie = require('cookie');

var express = require('express');
var router = express.Router();
const {
  // jwt_secret = Math.random().toString(36).slice(2, 18) // min 16 caracteres random => 5473e3f141e0328ce87dac9366e0aace
  jwt_secret = "123456789abcdefg"
} = process.env;

//database connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDb = "mongodb://127.0.0.1/projet_final_1";
const usersModel = require("../models/usersModel");



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cool/', function(req, res, next) {
  res.send('You\'re so cool!');
});

router.post('/connection2/', async function(req, res, next) {
  try{
    // console.log(req);
    const bodyReq = req.body;
    console.log("req : " + JSON.stringify(bodyReq));
    let user = bodyReq.userName;
    if(/[0-9a-zA-Z_]+/.test(user)){
      // Request datas from database.
      console.log("user : " + user);
      let secureUser = /([0-9a-zA-Z_]+)/.exec(user)[1];
      console.log("secureUser : " + secureUser);
      //main().catch((err) => console.log(err));
      await mongoose.connect(mongoDb);
      // Use the SomeModel object (model) to find all SomeModel records
      const usersInstances = await usersModel.find(
        { userName: new RegExp(secureUser, "i") }, //Could use regex here.
        "userName age",
      ).exec();

      console.log("searchResults : " + usersInstances);
      res.send({usersInstances: usersInstances});
      // res.send(usersInstances);
      
    } else {
      res.send('Erreur : typo dans user détecté.');
    }
  } catch (error) {
    console.log("erreur : " + error);
    return next(error);
  }
  //res.send('Page connection : //!\\ work in progress //!\\.');
});

router.post('/connection/', async function(req, res, next) {
  try{
    // console.log(req);
    const bodyReq = req.body;
    console.log("req : " + JSON.stringify(bodyReq));
    let user = bodyReq.userName;
    if(/[0-9a-zA-Z_]+/.test(user)){
      // Request datas from database.
      console.log("user : " + user);
      let secureUser = /([0-9a-zA-Z_]+)/.exec(user)[1];
      console.log("secureUser : " + secureUser);
      //main().catch((err) => console.log(err));
      await mongoose.connect(mongoDb);
      // Use the SomeModel object (model) to find all SomeModel records
      let usersInstances = await usersModel.find(
        { userName: new RegExp(secureUser, "i") }, //Could use regex here.
        "userName password age",
      ).exec();
      usersInstances = JSON.parse(JSON.stringify(usersInstances))[0];

      console.log("searchResults : " + usersInstances);
      console.log("database password : " + usersInstances.password);
      console.log("user password : " + bodyReq.password);
      if(usersInstances.password === bodyReq.password){
        usersInstances.password = "true";
        usersInstances.token = Math.random().toString(36).slice(2, 18);
        const insertStatut = await usersModel.updateOne({ userName: new RegExp(secureUser, "i") }, {$set: {token: usersInstances.token}});
        console.log("insertStatut : " + JSON.stringify(insertStatut));

        let token = jwt.sign({ userName: usersInstances.userName.toString()}, usersInstances.token);
        const tokenCookie = cookie.serialize('jwt_token', token, {
            httpOnly: true, // il ne se transmet que via les requetes HTTP -> Impossible de le recupérer en JS avec document.cookie
            secure: false, // si true, le cookie ne sera transmis que si il y a un certificat SSL en place (imperatif sur un site en production)
            maxAge: 3600, // durée de validité du token, en secondes
            path: '/' // le chemin depuis l'URL racine de votre app qui indique où est valide le token
        })
    
        // res.setHeader('Set-Cookie', tokenCookie);
        res.send({usersInstances: usersInstances, token: token});
      } else {
        usersInstances.password = "false";
        res.send({usersInstances: usersInstances});
      }
      
    } else {
      res.send('Erreur : typo dans user détecté.');
    }
  } catch (error) {
    console.log("erreur : " + error);
    return next(error);
  }
});

router.post('/deconnection/', async function(req, res, next) {
  res.send('Page inscription (post) : //!\\ work in progress //!\\.');
});

router.post('/inscription/', async function(req, res, next) {
  try{
    // console.log(req);
    const bodyReq = req.body;
    console.log("req : " + JSON.stringify(bodyReq));
    let id = bodyReq._id.toString();
    let user = bodyReq.userName.toString();
    let password = bodyReq.password.toString();
    if(/[0-9]+/.test(id) && /[0-9a-zA-Z_]+/.test(user) && /[0-9a-zA-Z_]+/.test(password)){
      // Request datas from database.
      console.log("user : " + user);
      let secureId = /([0-9]+)/.exec(id)[1];
      let secureUser = /([0-9a-zA-Z_]+)/.exec(user)[1];
      let securePassword = /([0-9a-zA-Z_]+)/.exec(password)[1];
      console.log("secureUser : " + secureUser);
      //main().catch((err) => console.log(err));
      await mongoose.connect(mongoDb);
      //const usersModel = mongoose.model("users", usersModelSchema);
      const test1Instance = new usersModel({ _id: Number(secureId.toString()), userName: secureUser.toString(), password: securePassword.toString(), age: 18 });
      await test1Instance.save();
      // Use the SomeModel object (model) to find all SomeModel records
      let usersInstances = await usersModel.find(
        { userName: new RegExp(secureUser, "i") }, //Could use regex here.
        "userName password age",
      ).exec();
      usersInstances = JSON.parse(JSON.stringify(usersInstances))[0];

      console.log("searchResults : " + usersInstances);
      console.log("database password : " + usersInstances.password);
      console.log("user password : " + bodyReq.password);
      if(usersInstances.password === bodyReq.password){
        usersInstances.password = "true";
        res.send({usersInstances: usersInstances});
      } else {
        usersInstances.password = "false";
        res.send({usersInstances: usersInstances});
      }
      
    } else {
      res.send('Erreur : typo dans user détecté.');
    }
  } catch (error) {
    console.log("erreur : " + error);
    return next(error);
  }
});

router.post('/desincription/', async function(req, res, next) {
  try{
    // console.log(req);
    const bodyReq = req.body;
    console.log("req : " + JSON.stringify(bodyReq));
    let user = bodyReq.userName;
    if(/[0-9a-zA-Z_]+/.test(user)){
      // Request datas from database.
      console.log("user : " + user);
      let secureUser = /([0-9a-zA-Z_]+)/.exec(user)[1];
      console.log("secureUser : " + secureUser);
      //main().catch((err) => console.log(err));
      await mongoose.connect(mongoDb);
      // Use the SomeModel object (model) to find all SomeModel records
      let usersInstances = await usersModel.find(
        { userName: new RegExp(secureUser, "i") }, //Could use regex here.
        "userName password age",
      ).exec();
      usersInstances = JSON.parse(JSON.stringify(usersInstances))[0];

      console.log("searchResults : " + usersInstances);
      console.log("database password : " + usersInstances.password);
      console.log("user password : " + bodyReq.password);
      if(usersInstances.password === bodyReq.password){
        await usersModel.deleteOne({ userName: usersInstances.userName, password: usersInstances.password})
        usersInstances.password = "true";
        res.send({usersInstances: usersInstances});
      } else {
        usersInstances.password = "false";
        res.send({usersInstances: usersInstances});
      }
      
    } else {
      res.send('Erreur : typo dans user détecté.');
    }
  } catch (error) {
    console.log("erreur : " + error);
    return next(error);
  }
});

router.post('/page/', async function(req, res, next) {
  try{
    // console.log(req);
    const bodyReq = req.body;
    console.log("req : " + JSON.stringify(bodyReq));
    let user = bodyReq.userName;
    if(/[0-9a-zA-Z_]+/.test(user)){
      // Request datas from database.
      console.log("user : " + user);
      let secureUser = /([0-9a-zA-Z_]+)/.exec(user)[1];
      console.log("secureUser : " + secureUser);
      //main().catch((err) => console.log(err));
      await mongoose.connect(mongoDb);
      // Use the SomeModel object (model) to find all SomeModel records
      let usersInstances = await usersModel.find(
        { userName: new RegExp(secureUser, "i") }, //Could use regex here.
        "userName password token age",
      ).exec();
      usersInstances = JSON.parse(JSON.stringify(usersInstances))[0];

      console.log("searchResults : " + usersInstances);
      console.log("database token : " + usersInstances.token);
      console.log("user token : " + bodyReq.token);
      if(usersInstances.token.toString() === bodyReq.token.toString()){
        usersInstances.password = "true";
        usersInstances.token = Math.floor(Math.random() * 100).toString();
        const insertStatut = await usersModel.updateOne({ userName: new RegExp(secureUser, "i") }, {$set: {token: usersInstances.token}});
        console.log("insertStatut : " + JSON.stringify(insertStatut));
        res.send({usersInstances: usersInstances});
      } else {
        usersInstances.password = "false";
        res.send({usersInstances: usersInstances});
      }
      
    } else {
      res.send('Erreur : typo dans user détecté.');
    }
  } catch (error) {
    console.log("erreur : " + error);
    return next(error);
  }
});

router.get('/:id/', function(req, res, next) {
  //id doit être un word character ([0-9a-zA-Z_]).
  res.send('id: ' + req.params.id);
});

module.exports = router;
