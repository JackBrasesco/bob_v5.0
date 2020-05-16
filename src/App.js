import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactAudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Bob from './bob.jpg'
import Alarm from './alarm.wav'
const annyang = require('annyang');

class BobLogic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        output1: "",
        output2: "",
        output3: "",
        output4: "",
        input: "",
        isSignIn: false,
        isSignUp: false,
        isTimer: false,
        timerLength: 0,
        timerMinutes: 0,
        timerSeconds: 0,
        timerHours: 0,
        timerDisplay: "",
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
    }
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
    let inputArr = input.split(" ")
    for (let i = 0;i<inputArr.length;i++) {
      if (inputArr[i] == "what's") {
        wordBank.whats = i
      } else if (inputArr[i] =="up") {
        wordBank.up = i
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
      }  else if (inputArr[i] =="YouTube") {
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
      } else if (inputArr[i] =="note") {
        wordBank.note = i
      }
    }


    if (wordBank.whats > -1 && wordBank.up > -1 && wordBank.up > wordBank.whats) {
      console.log("salutations")
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
      }
      else if (siteToGoTo == "theremotelearningschedule") {
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
      } else {
        this.bobResponseToList("let's go to that website")
        this.openInNewTab("https://" + siteToGoTo)
      }
    }

    else if (wordBank.what > -1 && wordBank.my > -1 && wordBank.name > -1 || wordBank.whats > -1 && wordBank.my > -1 && wordBank.name > -1) {
      console.log(this.state.account.meta.notes)
      this.bobResponseToList(this.state.account.meta.notes)
    }

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

   else if (wordBank.conjugate > -1) {
    this.bobResponseToList("conjugating")
    inputArr.shift()
    this.openInNewTab("https://www.spanishdict.com/conjugate/" + inputArr.join("%20"))
  }

  else if (wordBank.say > -1) {
    inputArr.shift()
    this.bobResponseToList(inputArr.join(" "))
  }

  else if (wordBank.define > -1) {
    this.openInNewTab("https://www.google.com/search?q=" + inputArr.join("+"))
    console.log("define")
  }

  else if (wordBank.synonym > -1) {
    this.openInNewTab("https://www.google.com/search?q=" + inputArr.join("+"))
    console.log("synonym")
  }

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

  else if (wordBank.read > -1 && wordBank.notes > -1) {
    fetch("http://localhost:8080/readNotes", {
      method: "put",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify([this.state.account.username])
    })
    .then(res => res.text())
    .then(body => this.displayNotes(body))
  }

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
    fetch("http://localhost:8080/addNoteToAccount", {
      method: "put",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify([this.state.account.username,newNotes])
    })
    .then(res => res.text())
    .then(body => this.updateAccount(body))
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
  render() {
    return(
      <>
      <div id="output-box">
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
