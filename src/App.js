import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Bob from './bob.jpg'
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
      }
    }
    if (wordBank.whats > -1 && wordBank.up > -1 && wordBank.up > wordBank.whats) {
      console.log("salutations")
      this.bobResponseToList("salutations!")
      .then(res => console.log(res))
    } else if (wordBank.check > -1 && wordBank.my > -1 && wordBank.email > -1) {
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
    } else if (wordBank.go > -1 && wordBank.to > -1 && wordBank.to > wordBank.go) {
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
      } else {
        this.bobResponseToList("let's go to that website")
        this.openInNewTab("https://" + siteToGoTo)
      }
    } else if (wordBank.what > -1 || wordBank.whats > -1 && wordBank.my > -1 && wordBank.name > -1) {
      console.log("hey")
      this.bobResponseToList(this.state.account.username)
    } else {
      this.bobResponseToList("Response not expected, please take the time to program the desired response")
    }
    console.log(inputArr)
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
            <div id="pop-up-container1">
              <h1 className="pop-up-title">Timer</h1>
              <p id="pop-up1-text"> 3:34</p>
            </div>
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
