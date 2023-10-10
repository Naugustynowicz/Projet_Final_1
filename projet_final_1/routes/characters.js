//security import
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookie = require('cookie');

const {
  jwt_secret // min 16 caracteres random => 5473e3f141e0328ce87dac9366e0aace
} = process.env;

var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDb = "mongodb://127.0.0.1/projet_final_1";
const usersModel = require("../models/usersModel");
const charactersModel = require("../models/charactersModel");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/characters-list/', async function(req, res, next) {
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

      const jwt_token = bodyReq.userToken;
      if( !jwt_token )
      {
          // redirection vers la page login
          console.log("Pas de token.");
      }
      console.log("Token : " + jwt_token);
      let decodedToken = jwt.verify(jwt_token, usersInstances.token);
      //const loggedUser = new UserModel.findOne(decodedToken.userName);
      // if( loggedUser.role !== 'admin' )
      // {
      //     // detruire le token et renvoyer vers la page d'accueil
      //     // redirection
      //     console.log("Echec de la vérification.");
      // }
      // recuperation des data et envoi pour affichage de la page admin
      console.log("Vérification : " + JSON.stringify(decodedToken));

      console.log("searchResults : " + JSON.stringify(usersInstances));
      console.log("database user : " + usersInstances.userName.toString());
      console.log("token user : " + decodedToken.userName.toString());
      if(decodedToken.userName.toString() === usersInstances.userName.toString()){
        usersInstances.password = "true";

        const charactersInstances = await charactersModel.find(
          { characterName: new RegExp(/\w+/, "i") }, //Could use regex here.
          "characterName",
        ).exec();
  
        console.log("searchResults : " + charactersInstances);
        res.send({usersInstances: usersInstances,charactersInstances: charactersInstances});
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
