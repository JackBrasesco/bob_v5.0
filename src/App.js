import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactAudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Speech from 'speak-tts';
import jsHue from 'jshue'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Bob from './bob.jpg'
import Alarm from './alarm.wav'
const annyang = require('annyang');
let hue = jsHue();
let bridge = hue.bridge('192.168.1.80');
let user = bridge.user("SLNNqvOYSKUZLfDIMpmI9oz0ZAD2R7n0UAyZ1Lhi")
const speech = new Speech()
speech.init().then((data) => {
    // The "data" object contains the list of available voices and the voice synthesis params
    console.log("Speech is ready, voices are available", data)
}).catch(e => {
    console.error("An error occured while initializing : ", e)
})

class Reminder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     message: "message",
     time: new Date(0,0,0,0,0,0,0),
     isRepeating: false,
     isRendering: false,
     currentTime: new Date(),
     // timerCountdown: setInterval(function() {this.decreaseTimer()},1000),
     // decreaseTimer: function() {
     //   let currentTimer = this.state.time
     //   this.setState({time: currentTimer - 1000})
     // }
   }
   console.log("hello!")
   while (this.state.time > 0) {
     console.log("hi")
   }
  }

  componentDidMount() {
    console.log("componentDidMount!")
    return new Promise(resolve => (
      resolve('go!')
    ))
  }
  stateSetter(message,time) {
    let _this = this
    async function holdup() {
      let didMount = await _this.componentDidMount()
      if (didMount == "go!") {
        this.setState({message: message,time: time,isRendering: true})
      }
    }
  }
  decreaseTimer() {
    let currentTimer = this.state.time
    this.setState({time: currentTimer - 1000})
  }

  timerShutdown() {
    clearInterval(this.state.timerCountdown)
  }

  showReminder() {
    this.setState({isRendering: true})
  }

  closeReminderButtonOnClick() {
    this.setState({isRendering: false})
  }

  setRepeating() {
    this.setState({isRepeating: true})
  }

  unsetRepeating() {
    this.setState({isRepeating: false})
  }

  render() {
    return(
      <div className={this.state.isRendering ? 'show' : 'hide'} id="pop-up-container2">
        <h1 id="pop-up-title">Reminder</h1>
        <p id="pop-up-text-reminder">{this.state.message}</p>
        <Button id="close-reminder-button" variant="info" onClick={this.closeReminderButtonOnClick.bind(this)}>close reminder.</Button>
      </div>
    )
  }
}

class BobLogic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        light1: {
          on: false,
        },
        light2: {
          on: false,
        },
        light3: {
          on: false,
        },
        light4: {
          on: false,
        },
        output1: "",
        output2: "",
        output3: "",
        output4: "",
        input: "",
        isProjectDisplay: false,
        currentProject: {
          title: "Bot Bob Projects",
          time: "3 hours",
          todo: ["make it render properly","add new project to acnt","load project from acnt","delete project from acnt"],
          todoRender: "hi!",
          progress: ["make it render properly",["todo renders","progress renders"],"add new project to acnt",["add keywords to indexOf brew","instatiate new project with title","add new project w/ title in express","update account in mongo","update account to reflect new project","add inputs for time, todo, and progresses","hook those inputs into account system"]],
          progressRender: "hello"
        },
        isSignIn: false,
        isSignUp: false,
        isTimer: false,
        timerLength: 0,
        timerMinutes: 0,
        timerSeconds: 0,
        timerHours: 0,
        timerDisplay: "",
        reminderHour: 0,
        reminderMinute: 0,
        reminderArray: [],
        usernameinput: "",
        passwordinput: "",
        usernameinputsi: "",
        passwordinputsi: "",
        account: {
          username: "not logged in",
          meta: {
            favorites: {
              website: "not logged in",
              animal: "not logged in",
              food: "not logged in",
              number: "not logged in",
            },
            notes: ["not logged in"],
            projects: ["not logged in"],
            commands: ["not logged in"],
          }
        }
      }
  }
  cleanText(e) {
    e.preventDefault()

    this.generateResponse(this.state.input);
    this.setState({input: ""})
  }
  bobResponseToList(output) {

    speech.speak({
        text: output,
    })
    if (this.state.ouput1 == "") {
      this.setState({output1: "Bob: " + output})
    } else if (this.state.output2 == "") {
      this.setState({output2: "Bob: " + output})
    } else if (this.state.output3 == "") {
      this.setState({output3: "Bob: " + output})
    } else if (this.state.output4 == "") {
      this.setState({output4: "Bob: " + output})
    } else {
      let newOutput1 = this.state.output2
      let newOutput2 = this.state.output3
      let newOutput3 = this.state.output4
      this.setState({
        output1: newOutput1,
        output2: newOutput2,
        output3: newOutput3,
        output4: "Bob: " + output
      })
    }
  }
  openInNewTab(url) {
    var win = window.open(url,'_blank');
    win.focus();
  }
  generateResponse(input) {
    console.log(input)
    //lights flash as indicator that bob is responding
    user.setLightState(2, {alert: "select"}).then(data => {
      console.log("horray!")
    })
    user.setLightState(1, {alert: "select"}).then(data => {
      console.log("horray!")
    })
    user.setLightState(3, {alert: "select"}).then(data => {
      console.log("horray!")
    })
    user.setLightState(4, {alert: "select"}).then(data => {
      console.log("horray!")
    })
    //this wordBank is a list of words that bob is looking out for that can trigger commands, the whole system is bascially a home brewed version of .indexOf
    let wordBank = {
      whats: -1,
      up: -1,
      go: -1,
      to: -1,
      remote: -1,
      learning: -1,
      schedule: -1,
      piskelapp: -1,
      check: -1,
      my: -1,
      email: -1,
      school: -1,
      personal: -1,
      nueva: -1,
      what: -1,
      name: -1,
      lookup: -1,
      look: -1,
      search: -1,
      for: -1,
      image: -1,
      images: -1,
      youtube: -1,
      translate: -1,
      spanish: -1,
      conjugate: -1,
      say: -1,
      define: -1,
      synonym: -1,
      timer: -1,
      set: -1,
      add: -1,
      notes: -1,
      read: -1,
      delete: -1,
      note: -1,
      remind: -1,
      me: -1,
      at: -1,
      turn: -1,
      light: -1,
      on: -1,
      off: -1,
      red: -1,
      blue: -1,
      gold: -1,
      green: -1,
      pink: -1,
      one: -1,
      two: -1,
      three: -1,
      four: -1,
      brightness: -1,
      full: -1,
      half: -1,
      projects: -1,
      day: -1,
      mode: -1,
      stoner: -1,
      night: -1,
    }
    //arranges the outputs in css
    if (this.state.ouput1 == "") {
      this.setState({output1: "You: " + input})
    } else if (this.state.output2 == "") {
      this.setState({output2: "You: " + input})
    } else if (this.state.output3 == "") {
      this.setState({output3: "You: " + input})
    } else if (this.state.output4 == "") {
      this.setState({output4: "You: " + input})
    } else {
      let newOutput1 = this.state.output2
      let newOutput2 = this.state.output3
      let newOutput3 = this.state.output4
      this.setState({
        output1: newOutput1,
        output2: newOutput2,
        output3: newOutput3,
        output4: "You: " + input
      })
    }
    //goes through input and searches for command words
    let inputArr = input.split(" ")
    for (let i = 0;i<inputArr.length;i++) {
      if (inputArr[i] == "what's") {
        wordBank.whats = i
      } else if (inputArr[i] =="up") {
        wordBank.up = i
      } else if (inputArr[i] =="at") {
        wordBank.at = i
      } else if (inputArr[i] =="go") {
        wordBank.go = i
      } else if (inputArr[i] =="to") {
        wordBank.to = i
      } else if (inputArr[i] =="remote") {
        wordBank.remote = i
      } else if (inputArr[i] =="learning") {
        wordBank.learning = i
      } else if (inputArr[i] =="schedule") {
        wordBank.schedule = i
      } else if (inputArr[i] =="piskelapp") {
        wordBank.piskelapp = i
      } else if (inputArr[i] =="check") {
        wordBank.check = i
      } else if (inputArr[i] =="my") {
        wordBank.my = i
      } else if (inputArr[i] =="email") {
        wordBank.email = i
      } else if (inputArr[i] =="school") {
        wordBank.school = i
      } else if (inputArr[i] =="personal") {
        wordBank.personal = i
      } else if (inputArr[i] =="Nueva") {
        wordBank.nueva = i
      } else if (inputArr[i] =="what") {
        wordBank.what = i
      } else if (inputArr[i] =="name") {
        wordBank.name = i
      } else if (inputArr[i] =="lookup") {
        wordBank.lookup = i
      } else if (inputArr[i] =="look") {
        wordBank.look = i
      } else if (inputArr[i] =="search") {
        wordBank.search = i
      } else if (inputArr[i] =="for") {
        wordBank.for = i
      } else if (inputArr[i] =="image") {
        wordBank.image = i
      } else if (inputArr[i] =="Images") {
        wordBank.images = i
      }  else if (inputArr[i] =="YouTube" || inputArr[i]=="youtube") {
        wordBank.youtube = i
      } else if (inputArr[i] =="translate") {
        wordBank.translate = i
      } else if (inputArr[i] =="Spanish") {
        wordBank.spanish = i
      } else if (inputArr[i] =="conjugate") {
        wordBank.conjugate = i
      } else if (inputArr[i] =="say") {
        wordBank.say = i
      }  else if (inputArr[i] =="Define") {
        wordBank.define = i
      } else if (inputArr[i] =="synonym") {
        wordBank.synonym = i
      }  else if (inputArr[i] =="timer") {
        wordBank.timer = i
      }  else if (inputArr[i] =="set") {
        wordBank.set = i
      }  else if (inputArr[i] =="notes") {
        wordBank.notes = i
      }  else if (inputArr[i] =="add") {
        wordBank.add = i
      }  else if (inputArr[i] =="read") {
        wordBank.read = i
      } else if (inputArr[i] =="delete") {
        wordBank.delete = i
      } else if (inputArr[i] =="note" || inputArr[i] =="Note") {
        wordBank.note = i
      } else if (inputArr[i] =="remind" || inputArr[i] =="Remind") {
        wordBank.remind = i
      }  else if (inputArr[i] =="me") {
        wordBank.me = i
      } else if (inputArr[i] =="turn" || inputArr[i] == "Turn") {
        wordBank.turn = i
      } else if (inputArr[i] =="light" || inputArr[i] == "lights" || inputArr[i] == "Lights") {
        wordBank.light = i
      } else if (inputArr[i] =="on") {
        wordBank.on = i
      } else if (inputArr[i] =="off") {
        wordBank.off = i
      } else if (inputArr[i] =="red") {
        wordBank.red = i
      } else if (inputArr[i] =="blue") {
        wordBank.blue = i
      } else if (inputArr[i] =="gold") {
        wordBank.gold = i
      } else if (inputArr[i] =="green") {
        wordBank.green = i
      } else if (inputArr[i] =="pink") {
        wordBank.pink = i
      } else if (inputArr[i] =="one" || inputArr[i] =="1") {
        wordBank.one = i
      } else if (inputArr[i] =="two" || inputArr[i] =="2") {
        wordBank.two = i
      } else if (inputArr[i] =="three" || inputArr[i] =="3") {
        wordBank.three = i
      } else if (inputArr[i] =="four" || inputArr[i] =="4") {
        wordBank.four = i
      } else if (inputArr[i] =="brightness") {
        wordBank.brightness = i
      } else if (inputArr[i] =="full") {
        wordBank.full = i
      } else if (inputArr[i] =="half") {
        wordBank.half = i
      } else if (inputArr[i] == "projects") {
        wordBank.projects = i
      }  else if (inputArr[i] == "day") {
        wordBank.day = i
      }
      else if (inputArr[i] == "mode") {
        wordBank.mode = i
      }
      else if (inputArr[i] == "stoner") {
        wordBank.stoner = i
      }
      else if (inputArr[i] == "night") {
        wordBank.night = i
      } else if (inputArr[i] == "good") {
        wordBank.good = i
      } else if (inputArr[i] == "morning") {
        wordBank.morning = i
      }

    }

    if (wordBank.good > -1 && wordBank.morning > -1) {
      this.bobResponseToList("Good Morning! Get some Caffeine in you and read something!")
      this.generateResponse("turn the lights to day mode")
      return
    }

    if (wordBank.turn > -1 && wordBank.light > -1 && wordBank.mode > -1 ) {
      if (wordBank.day == wordBank.mode -1) {
        console.log("day mode!")
        let command = {
          on: true,
          bri: 254,
          hue: 6500
        }
        let command2 = {
          on: true,
          hue: 0,
          bri:254,
        }
        user.setLightState(1, command).then(data => {
          console.log("horray!")
        })
        user.setLightState(2, command).then(data => {
          console.log("horray!")
        })
        user.setLightState(3, command).then(data => {
          console.log("horray!")
        })
        user.setLightState(4, command2).then(data => {
          console.log("horray!")
        })
        this.bobResponseToList("Day mode activated.")
      } else if (wordBank.night == wordBank.mode - 1 || wordBank.stoner == wordBank.mode - 1) {
        let command = {
          on: true,
          bri: 254,
          hue: 54440,
        }
        user.setLightState(1, command).then(data => {
          console.log("horray!")
        })
        user.setLightState(2, command).then(data => {
          console.log("horray!")
        })
        user.setLightState(3, command).then(data => {
          console.log("horray!")
        })
        user.setLightState(4, command).then(data => {
          console.log("horray!")
        })
        this.bobResponseToList("Night mode activated.")
      }
    }
    if (wordBank.whats > -1 && wordBank.up > -1 && wordBank.up > wordBank.whats) {
      console.log(this.state)
      this.setState({isProjectDisplay: true})
      this.processTodoList()
      this.bobResponseToList("salutations!")
    }

    else if (wordBank.check > -1 && wordBank.my > -1 && wordBank.email > -1) {
      if (wordBank.nueva > -1) {
        this.bobResponseToList("Opening up your Nueva email")
        this.openInNewTab("https://mail.google.com/mail/u/2/#inbox")
      } else if (wordBank.personal > -1) {
        this.bobResponseToList("Opening up your personal email")
        this.openInNewTab("https://mail.google.com/mail/u/1/#inbox")

      } else if (wordBank.school > -1) {
        this.bobResponseToList("Opening up your school email")
        this.openInNewTab("https://mail.google.com/mail/u/0/#inbox")

      } else {
        this.bobResponseToList("Let's check on your email. . .")
        this.openInNewTab("https://mail.google.com/mail/u/1/#inbox")

      }
    }

    //opens website, checks from list of preloaded ones but will go to whatever domain the user says/types
     else if (wordBank.go > -1 && wordBank.to > -1 && wordBank.to > wordBank.go) {
      let siteToGoTo = "null"
      if (inputArr.length > 2) {
        inputArr.shift()
        inputArr.shift()
        siteToGoTo = inputArr.join("");
      }
      if (siteToGoTo == "canvas") {
        this.bobResponseToList("Going to Canvas!")
        this.openInNewTab("https://nuevaschool.instructure.com/calendar")
      }
      else if (siteToGoTo == "email") {
        this.bobResponseToList("Let's check on your email. . .")
        this.openInNewTab("https://mail.google.com/mail/u/1/#inbox")
      } else if (siteToGoTo == "youtube" || siteToGoTo == "YouTube") {
        this.bobResponseToList("Let's go to youtube. . .")
        this.openInNewTab("https://youtube.com")
      }else if (siteToGoTo == "theremotelearningschedule") {
        this.bobResponseToList("Going to the remote learning schedule!")
        this.openInNewTab("https://my.nuevaschool.org/base.php?q__=JLNLQlfm%2BSVCgb3sDMlf5po%2FHyFBO%2BOOt%2BQmAVFdsSC9NsvszErxahEhBEqCEsCD")
      }else if (siteToGoTo == "piskelapp") {
        this.bobResponseToList("Opening Piskel App!")
        this.openInNewTab("https://www.piskelapp.com/")
      } else if (siteToGoTo == "calendar") {
        this.bobResponseToList("going to your calendar!")
        this.openInNewTab("https://calendar.google.com/calendar/r")
      } else if (siteToGoTo == "mycalendar") {
        this.bobResponseToList("going to your calendar!")
        this.openInNewTab("https://calendar.google.com/calendar/r")
      } else if (siteToGoTo == "drive") {
        this.bobResponseToList("going to drive")
        this.openInNewTab("https://drive.google.com")
      }else {
        this.bobResponseToList("let's go to that website")
        this.openInNewTab("https://" + siteToGoTo)
      }
    }

    else if (wordBank.what > -1 && wordBank.my > -1 && wordBank.name > -1 || wordBank.whats > -1 && wordBank.my > -1 && wordBank.name > -1) {
      this.bobResponseToList(this.state.account.username)
    }
    //looks something up on google, youtube, or google images
    else if (wordBank.lookup > -1 || wordBank.look > -1 && wordBank.up > -1) {
      if (wordBank.youtube > -1) {
        inputArr.shift()
        if (wordBank.look > -1 && wordBank.up >-1) {
          inputArr.shift()
        }
        inputArr.pop()
        inputArr.pop()
        this.bobResponseToList("searching youtube for that video. . .")
        this.openInNewTab("https://www.youtube.com/results?search_query=" + inputArr.join("+"))
      } else if (wordBank.image > -1 || wordBank.images > -1) {
        inputArr.shift()
        if (wordBank.look > -1 && wordBank.up >-1) {
          inputArr.shift()
        }
        inputArr.pop()
        inputArr.pop()
        inputArr.pop()
        this.bobResponseToList("looking up some images. . .")
        this.openInNewTab("https://www.google.com/search?q=" + inputArr.join("+") + "&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiS5JWU_qzpAhWcHjQIHU4NA2gQ_AUoA3oECBMQBQ&biw=1920&bih=969")
      } else {
      inputArr.shift()
      if (wordBank.look > -1 && wordBank.up >-1) {
        inputArr.shift()
      }
      this.bobResponseToList("looking that up. . .")
      this.openInNewTab("https://www.google.com/search?q=" + inputArr.join("+"))
      }
    }
    // search for image, youtube video, or the web
    else if (wordBank.search > -1) {
      console.log(wordBank)
      if (wordBank.youtube > -1) {
        inputArr.shift()
        if (wordBank.for > -1) {
          inputArr.shift()
        }
        inputArr.pop()
        inputArr.pop()
        this.bobResponseToList("searching youtube for that video. . .")
        this.openInNewTab("https://www.youtube.com/results?search_query=" + inputArr.join("+"))
      } else if (wordBank.image > -1 || wordBank.images > -1) {
        inputArr.shift()
        if (wordBank.for > -1) {
          inputArr.shift()
        }
        inputArr.pop()
        inputArr.pop()
        inputArr.pop()
        this.bobResponseToList("searching for some images. . .")
        this.openInNewTab("https://www.google.com/search?q=" + inputArr.join("+") + "&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiS5JWU_qzpAhWcHjQIHU4NA2gQ_AUoA3oECBMQBQ&biw=1920&bih=969")
      } else {
      inputArr.shift()
      if (wordBank.for > -1) {
        inputArr.shift()
      }
      this.bobResponseToList("searching the web. . .")
      this.openInNewTab("https://www.google.com/search?q=" + inputArr.join("+"))
    }
  }

  //translates to/from spanish or other languages
  else if (wordBank.translate > -1) {
    if (wordBank.spanish > -1) {
      inputArr.shift()
      inputArr.pop()
      inputArr.pop()
      this.bobResponseToList("translating!")
      this.openInNewTab("https://www.spanishdict.com/translate/" + inputArr.join("%20"))
    } else {
      this.bobResponseToList("translating!")
      this.openInNewTab("https://www.google.com/search?q=" + inputArr.join("+"))
    }
  }

  //opens up conjugation table for spanish verbs
   else if (wordBank.conjugate > -1) {
    this.bobResponseToList("conjugating")
    inputArr.shift()
    this.openInNewTab("https://www.spanishdict.com/conjugate/" + inputArr.join("%20"))
  }
  //outputs the input
  else if (wordBank.say > -1) {
    inputArr.shift()
    this.bobResponseToList(inputArr.join(" "))
  }
  //looks up the definition of a ward
  else if (wordBank.define > -1) {
    this.openInNewTab("https://www.google.com/search?q=" + inputArr.join("+"))
    console.log("define")
  }
  //finds synonyms for words
  else if (wordBank.synonym > -1) {
    this.openInNewTab("https://www.google.com/search?q=" + inputArr.join("+"))
    console.log("synonym")
  }
  //sets a tiemr for a designamted amount of time
   else if (wordBank.set > -1 && wordBank.timer > -1) {
    if (wordBank.set < wordBank.timer && wordBank.for > -1 && wordBank.for > wordBank.timer) {
      inputArr.shift()
      inputArr.shift()
      inputArr.shift()
      inputArr.shift()
      console.log(inputArr)
      if (!this.state.isTimer) {
      for (let i=0; i<inputArr.length; i++) {
        if (inputArr[i + 1] == "hours" || inputArr[i+1] == "hour") {
          this.setState({timerHours: inputArr[i]})
        } else if (inputArr[i + 1] == "minutes" || inputArr[i+1] == "minute") {
          this.setState({timerMinutes: inputArr[i]})
        } else if (inputArr[i+1] == "seconds" || inputArr[i+1] == "second") {
          this.setState({timerSeconds: inputArr[i]})
        }
      }
        this.setState({isTimer: true})
        let _this = this
        this.bobResponseToList("starting timer. . .")
        setTimeout(function() {_this.renderTimer()},50)
        let timerCountdown = setInterval(function() {_this.decreaseTimer()},1000)
        let timeToMilli = (this.state.timerHours * 3600000) + (this.state.timerMinutes * 60000) + (this.state.timerSeconds * 1000)
        setTimeout(function() {
          clearInterval(timerCountdown)
        },timeToMilli + 1051)
      } else {
        this.bobResponseToList("You cannot have two timers going at once.")
      }
    } else {
      this.bobResponseToList("that is the improper way to set up a timer, please say 'set a timer for ________'")
    }
  }
  //if logged in, adds note to account
  else if (wordBank.add > -1 && wordBank.to > -1 && wordBank.notes > -1) {
    inputArr.shift()
    inputArr.pop()
    inputArr.pop()
    if (wordBank.my > -1 && wordBank.my == wordBank.notes -1) {
      inputArr.pop()
    }
    if (this.state.account.username != "not logged in") {
        let newNotes = this.state.account.meta.notes
        console.log(newNotes)
        if (newNotes.length == 0) {
          newNotes.push(inputArr.join(" "))
        } else {
          newNotes = this.state.account.meta.notes.join(" ").split(',')
          console.log(newNotes)
          newNotes.push(inputArr.join(" "))
        }
        this.bobResponseToList("Adding note. . .")

        fetch("http://localhost:8080/addNoteToAccount", {
          method: "put",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify([this.state.account.username,newNotes])
        })
        .then(res => res.text())
        .then(body => this.updateAccount(body))

    } else {
      this.bobResponseToList("You must be signed in to make a note")
    }
  }
  //gets notes from account, if logged in
  else if (wordBank.read > -1 && wordBank.notes > -1) {
    fetch("http://localhost:8080/readNotes", {
      method: "put",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify([this.state.account.username])
    })
    .then(res => res.text())
    .then(body => this.displayNotes(body))
  }
  //deletes note from account if logged in
  else if (wordBank.delete > -1 && wordBank.note > -1) {
    inputArr.shift()
    inputArr.shift()
    let noteToDeleteIndex = parseInt(inputArr[0]) - 1
    console.log(noteToDeleteIndex)
    let notes = this.state.account.meta.notes.join(" ").split(',')
    console.log(notes)
    let newNotes = []
    for (let i=0;i<notes.length;i++) {
      if (i != noteToDeleteIndex) {
        console.log(notes[i])
        newNotes.push(notes[i])
      }
    }
    console.log(newNotes)
    this.bobResponseToList("Deleting that note...")

    fetch("http://localhost:8080/addNoteToAccount", {
      method: "put",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify([this.state.account.username,newNotes])
    })
    .then(res => res.text())
    .then(body => this.updateAccount(body))
  }
  //doesn't work yet
  else if (wordBank.remind > -1 && wordBank.me > -1 && wordBank.at > -1) {
    console.log("hello!")
    inputArr.shift()
    inputArr.shift()
    inputArr.shift()
    let newArr = inputArr.join(" ").split("at")
    let message = newArr[0]
    let time = newArr[1]
    let currentTime = new Date()
    if (time.substr(3,1) == ":") {
          console.log(parseInt(time.split(":")[0]))
        this.setState({reminderHour: parseInt(time.split(":")[0])})
          console.log(this.state)
    }
    console.log(this.state)
    if (this.state.reminderHour < currentTime.getHours()) {
          console.log("sup hoe")
          let fixedHour = this.state.reminderHour + 12
          console.log(fixedHour)
    }
    let reminderTimeInMilli = new Date(currentTime.getFullYear(),currentTime.getMonth(),currentTime.getDate(),this.state.reminderHour,this.state.reminderMinute,0,0)
    console.log(this.state.reminderHour,this.state.reminderMinute)
    this.bobResponseToList(reminderTimeInMilli)
    return

  }
 //changes the lights in my room
  else if (wordBank.turn > -1 && wordBank.light > -1) {
    let lightToChange = 5
    let command = {}
    if (wordBank.one > -1) {
      lightToChange = 1
    } else if (wordBank.two > -1) {
      lightToChange = 2
    }  else if (wordBank.three > -1) {
      lightToChange = 3
    }  else if (wordBank.four > -1) {
      lightToChange = 4
    }
    if (wordBank.on > -1) {
      command.on = true
      this.bobResponseToList("let there be light")

    }
    if (wordBank.off > -1) {
      command.on = false
    }
    if (wordBank.gold > -1) {
      command.hue = 6500
    }
    if (wordBank.red > -1) {
      command.hue = 0
      this.bobResponseToList("turning the light. . . cardinal")

    }
    if (wordBank.brightness > -1) {
      if (wordBank.full > -1) {
        command.bri = 254
      }
      if (wordBank.half > -1) {
        command.bri = 127

      }
    }
    if (lightToChange == 5) {
      user.setLightState(1, command).then(data => {
        console.log("horray!")
      })
      user.setLightState(2, command).then(data => {
        console.log("horray!")
      })
      user.setLightState(3, command).then(data => {
        console.log("horray!")
      })
      user.setLightState(4, command).then(data => {
        console.log("horray!")
      })
    } else {
    user.setLightState(lightToChange, command).then(data => {
      console.log("horray!")
    })
  };

  }

  else if (wordBank.add > -1 && wordBank.to > -1 && wordBank.projects > -1) {
    inputArr.shift()
    inputArr.pop()
    inputArr.pop()
    if (this.state.account.username != "not logged in") {
      let currentProjects = this.state.account.meta.projects
      currentProjects.push(inputArr.join(" "))
      this.setState({account: {
        username: this.state.account.username,
        meta: {
          favorites: this.state.account.favorites,
          notes: this.state.account.notes,
          projects: currentProjects,
          commands: this.state.account.commands,
        }
      }})
      fetch("http://localhost:8080/updateAccount", {
        method: "put",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify([this.state.account.username,this.state.account])
      })
      .then(res => res.text())
      this.bobResponseToList("added " + inputArr.join(" ") + " to projects")
    } else {
      this.bobResponseToList("You must be signed in to create a project")
    }

  }

  else {
      console.log(wordBank)
      console.log(this.state.timerHours + " hours, " +this.state.timerMinutes+ " minutes, " + this.state.timerSeconds + " seconds")

      this.bobResponseToList("Response not expected, please take the time to program the desired response")
    }
    console.log(inputArr)
}

  displayNotes(notes) {
    this.bobResponseToList(this.state.account.meta.notes.join(", "))
  }
  updateAccount(body) {
    //called after account is loaded from database or updated, sets the account in Bob's state to your account
    console.log("updating account")
    let newAcnt = JSON.parse(body)
    this.setState({account: newAcnt})
    console.log(this.state.account.meta.notes)
  }
  decreaseTimer() {
    if (this.state.isTimer) {
    if (this.state.timerHours > 0 && this.state.timerMinutes == 0 && this.state.timerSeconds == 0) {
      this.setState({timerMinutes: 59})
      this.setState({timerSeconds: 59})
      this.setState({timerHours: this.state.timerHours - 1})
      this.renderTimer()
    } else if (this.state.timerMinutes > 0 && this.state.timerSeconds == 0) {
      this.setState({timerSeconds: 59})
      this.setState({timerMinutes: this.state.timerMinutes - 1})
      this.renderTimer()
    } else if (this.state.timerSeconds > 0) {
      this.setState({timerSeconds: this.state.timerSeconds - 1})
      this.renderTimer()
    } else {
      this.setState({isTimer: false})
      this.bobResponseToList('Timer complete!')
      user.setLightState(2, {alert: "select"}).then(data => {
        console.log("horray!")
      })
      user.setLightState(1, {alert: "select"}).then(data => {
        console.log("horray!")
      })
      user.setLightState(3, {alert: "select"}).then(data => {
        console.log("horray!")
      })
      user.setLightState(4, {alert: "select"}).then(data => {
        console.log("horray!")
      })
      user.setLightState(2, {alert: "select"}).then(data => {
        console.log("horray!")
      })
      user.setLightState(1, {alert: "select"}).then(data => {
        console.log("horray!")
      })
      user.setLightState(3, {alert: "select"}).then(data => {
        console.log("horray!")
      })
      user.setLightState(4, {alert: "select"}).then(data => {
        console.log("horray!")
      })
      let timerPlayer = new Audio(Alarm)
      timerPlayer.play()
    }
  } else {
    this.bobResponseToList("Timer complete!")
  }
  }
  renderTimer() {
    let renderHour = this.state.timerHours
    let renderMinute = this.state.timerMinutes
    let renderSecond = this.state.timerSeconds
      if (this.state.timerMinutes < 10) {
        renderMinute = "0" + this.state.timerMinutes
      }
      if (this.state.timerSeconds < 10) {
        renderSecond = "0" + this.state.timerSeconds
      }
      this.setState({timerDisplay: renderHour + ":" + renderMinute + ":" + renderSecond})
    }

  componentDidMount() {
    //setup for Annyang (voice library)
    this.processTodoList.bind(this)
    var commands = {
      'hey bob *input': this.generateResponse.bind(this),
    }
    annyang.addCommands(commands);
    annyang.addCallback('soundstart', function() {
      console.log('sound detected');

    });
    annyang.addCallback('result', function() {
      console.log('sound stopped');
    });
    annyang.start();
  }
  refreshInput(e) {
    this.setState({input: e.target.value});
  }
  showSignInPopup(e) {
      if (this.state.isSignIn) {
        this.setState({isSignIn: false})
      } else {
        this.setState({isSignIn: true})
      }
      this.setState({isSignUp: false})
  }
  showSignUpPopup(e) {
      if (this.state.isSignUp) {
        this.setState({isSignUp: false})
      } else {
        this.setState({isSignUp: true})
      }
      this.setState({isSignIn: false})
  }
  refreshInputUsername(e) {
    this.setState({usernameinput: e.target.value});
  }
  refreshInputUsernamesi(e) {
    this.setState({usernameinputsi: e.target.value});
  }
  refreshInputPassword(e) {
    this.setState({passwordinput: e.target.value});
  }
  refreshInputPasswordsi(e) {
    this.setState({passwordinputsi: e.target.value});
  }
  signUpButtonOnClick(e) {
    fetch("http://localhost:8080/createAccount", {
      method: "put",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify([this.state.usernameinputsi,this.state.passwordinputsi])
    })
      .then(res => res.text())
      .then(body => this.bobResponseToList(body))
    //after created account
    this.setState({
      account: {
        username: this.state.usernameinputsi
      }
    })
    this.setState({
      usernameinputsi: '',
      passwordinputsi: '',
      isSignUp: false
    })
  }
  checkSignIn(body) {
    if (body == "The username and password don't match.") {
      this.bobResponseToList(body)
      this.setState({
        usernameinput: '',
        passwordinput: ''
      })
    } else {
      let obj = JSON.parse(body)
      this.setState({account: obj})
      this.setState({isSignIn: false})
    }
  }
  signInButtonOnClick(e) {
    let response = ''
    fetch("http://localhost:8080/getAccountByUsername", {
      method: "put",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify([this.state.usernameinput,this.state.passwordinput])
    })
    .then(res => res.text())
    .then(body => this.checkSignIn(body))
  }
  renderProgress(todo) {
    console.log(todo)
    let renderList = []
    for (let i=0;i<this.state.currentProject.progress.length; i+=2) {
      if (this.state.currentProject.progress[i] === todo) {
        for (let k=0;k<this.state.currentProject.progress[i+1].length;k++) {
          console.log("hey!")
          renderList.push(
            <Form key={`${i}progform-${k}`}>
              <Form.Check
                custom
                type='checkbox'
                key={`${i}progcheckbox-${k}`}
                id={`${i}progcheckbox-${k}`}
                label={""}
                />
              <p key={`${i}progtext-${k}`} className="todoItem">{this.state.currentProject.progress[i+1][k]}</p>
            </Form>
          )
        }
      }
    }
    this.setState({
      currentProject: {
        title: this.state.currentProject.title,
        time: this.state.currentProject.time,
        todo: this.state.currentProject.todo,
        todoRender: this.state.currentProject.todoRender,
        progress: this.state.currentProject.progress,
        progressRender: renderList
      }
    })
  }
  processTodoList() {
    let todoList = []
    console.log(this.state.currentProject.todo)
    for (let i=0;i<this.state.currentProject.todo.length;i++) {
      todoList.push(
        <Form key={`form-${i}`}>
         {['checkbox'].map((type) => (
           <Form.Check
            custom
              type={type}
              key={`checkbox=${i}`}
              id={`checkbox-${i}`}
              label={""}
           />
         ))}
         <p key={`text-${i}`} className="todoItem"  onClick={this.renderProgress.bind(this,this.state.currentProject.todo[i])}>{this.state.currentProject.todo[i]}</p>
        </Form>

      )
    }
    console.log(todoList)
    this.setState({
      currentProject: {
        title: this.state.currentProject.title,
        time: this.state.currentProject.time,
        todo: this.state.currentProject.todo,
        todoRender: todoList,
        progress: this.state.currentProject.progress,
        progressRender: this.state.currentProject.progressRedner
      }
    })
  }
  render() {
    return(
      <>
      <div id={this.state.isProjectDisplay ? 'output-box-2' : 'output-box'}>
        <div id="output">
          <div id="output">{this.state.output1}</div>
          <div id="output">{this.state.output2}</div>
          <div id="output">{this.state.output3}</div>
          <div id="output">{this.state.output4}</div>
        </div>
        <Button id="sign-in-button" variant="secondary" onClick={this.showSignInPopup.bind(this)}>sign-in</Button>
        <img id="bob-main-img" src={Bob} alt="bob"/>
        <Button id="help-button" variant="secondary" onClick={this.showSignInPopup.bind(this)}>help</Button>
        <form onSubmit={this.cleanText.bind(this)}>
          <input type="text" id="input" value={this.state.input} onChange={this.refreshInput.bind(this)} placeholder="Ask me anything. . ."></input>
        </form>
        <div className={this.state.isSignIn ? 'show' : 'hide'}id="pop-up-container2">
          <h1 className={this.state.isSignIn? 'show' : 'hide'} id="pop-up-title">Sign In</h1>
          <div id="username-field">
            <p id="pop-text-username">username:</p>
            <input type="text" id="username-input" value={this.state.usernameinput} onChange={this.refreshInputUsername.bind(this)} placeholder="Bot Bob"></input>
          </div>
          <div id="password-field">
            <p id="pop-text-password">password:</p>
            <input type="password" id="password-input" value={this.state.passwordinput} onChange={this.refreshInputPassword.bind(this)} placeholder="Password123"></input>
          </div>
          <Button id="verify-sign-in-button" variant="info" onClick={this.signInButtonOnClick.bind(this)}>Sign in!</Button>
          <p id="needAccount"> need an account? </p>
          <Button id="sign-up-button" variant="secondary" onClick={this.showSignUpPopup.bind(this)}>sign up</Button>
        </div>
        <div className={this.state.isProjectDisplay ? 'show' : 'hide'} id="pop-up-project">
          <h1 id="project-title">{this.state.currentProject.title}</h1>
          <p id="proj-hours-text"> hours worked: </p>
          <div id="proj-hours"> {this.state.currentProject.time} </div>
          <hr></hr>
          <p id="todo-text">Todo: </p>
          <p id="progress-text">Progress: </p>
          <div id="proj-line"></div>
          <div id="todo">{this.state.currentProject.todoRender} </div>
          <div id="progress"> {this.state.currentProject.progressRender}</div>
        </div>
        <div className={this.state.isSignUp ? 'show' : 'hide'}id="pop-up-container2">
          <h1 className={this.state.isSignUp ? 'show' : 'hide'} id="pop-up-title">Sign Up</h1>
          <div id="username-field">
            <p id="pop-text-username">new username:</p>
            <input type="text" id="username-input-signup" value={this.state.usernameinputsi} onChange={this.refreshInputUsernamesi.bind(this)} placeholder="Bot Bob"></input>
          </div>
          <div id="password-field">
            <p id="pop-text-password">new password:</p>
            <input type="password" id="password-input-signup" value={this.state.passwordinputsi} onChange={this.refreshInputPasswordsi.bind(this)} placeholder="Password123"></input>
          </div>
          <Button id="verify-sign-up-button" variant="info" onClick={this.signUpButtonOnClick.bind(this)}>Sign up!</Button>
        </div>
        <div className={this.state.isTimer ? 'show' : 'hide'} id="pop-up-container-timer">
          <h1 id="pop-up-title">Timer</h1>
          <p id="pop-up-text-timer">{this.state.timerDisplay}</p>
        </div>
      </div>
      </>
    )
  }
}



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
  return (
    <>
      <h1 id="main-title">FUN WITH BOT BOB v5.0!</h1>
      <Container>
        <Row>
          <Col xs={1}>
          </Col>
          <Col xs={10}>
           <BobLogic />
          </Col>
          <Col xs={1}>
          </Col>
        </Row>
      </Container>
    </>
  )
};
}

export default App;
