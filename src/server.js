const express = require('express');
const app = express();
let database = require('./database');
let AcntModel = require('./schema/account');
let HistModel = require('./schema/history');
let cors = require("cors");

app.use(express.json());
app.use(cors());


app.put('/readNotes', function(req,res,next) {
  let accountToSearchFor = req.body[0]
  AcntModel.findOne({username: accountToSearchFor}, function(err,acnt) {
    let notes = acnt.meta.notes
    res.send(notes)
  })
})

app.put('/addNoteToAccount', function(req,res,next) {
  console.log("request recieved!" + req.body)
  let usernamep = req.body[0]
  req.body.shift()
  let newNotes = req.body
  console.log(newNotes)
  async function updateAccount() {
    let loadAcnt = await AcntModel.findOneAndUpdate({username: usernamep},{meta: {notes: newNotes}},{new: true})
    return loadAcnt
  }
  updateAccount()
  .then(acnt => res.send(acnt))
})

app.put('/getAccountByUsername', function(req,res,next) {
  let accountToSearchFor = req.body[0]
  let response = ''
  AcntModel.findOne({username: accountToSearchFor}, function(err,acnt) {
      if (acnt.password == req.body[1]) {
        console.log("username and password match, signing in!")
        res.send(acnt)
      } else {
        console.log("username and password don't match, username was: " + req.body[1] + " but should have been: " + acnt.password)
        res.send("The username and password don't match.")
      }
  })
})

app.put('/createAccount', function(req,res,next) {
  console.log("new account creation request recieved: " + req.body)
  let newAccount = new AcntModel({
    username: req.body[0],
    password: req.body[1],
    meta: {
      favorites: {
        website: "I don't know your favorite website",
        animal: "I don't know your favorite animal",
        food: "I don't know your favorite food",
        number: 0,
      },
      notes: ["test"],
      projects: [],
      commands: [],
    }
  })
  let response = ""
  newAccount.save()
    .then(doc => {
      console.log(req.body[0] + ' has been created as an account')
      res.send("success!")
    })
    .catch(err => {
      res.send("duplicate account detected, try a different username")
      console.error(err)
    })
})

app.listen(8080, function() {
  console.log("Express Server spinning on port 8080.")
})
