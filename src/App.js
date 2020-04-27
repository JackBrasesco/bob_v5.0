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
      }
    }
    if (wordBank.whats > -1 && wordBank.up > -1 && wordBank.up > wordBank.whats) {
      console.log("salutations")
      this.bobResponseToList("salutations!")
    } else if (wordBank.go > -1 && wordBank.to > -1 && wordBank.to > wordBank.go) {
      if (inputArr.length > 3) {
        inputArr.shift()
        inputArr.shift()
        let siteToGoTo = inputArr.join()
        this.bobResponseToList("let's go to that website")
        this.openInNewTab("https://" + siteToGoTo)
      } else if (inputArr[2] == "canvas") {
        this.bobResponseToList("Going to Canvas!")
        this.openInNewTab("https://nuevaschool.instructure.com/calendar")
      }
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
        <Button id="sign-in-button" variant="secondary">sign-in</Button>
        <img id="bob-main-img" src={Bob} alt="bob"/>
        <Button id="help-button" variant="secondary">help</Button>
        <form onSubmit={this.cleanText.bind(this)}>
          <input type="text" id="input" value={this.state.input} onChange={this.refreshInput.bind(this)} placeholder="Ask me anything. . ."></input>
        </form>
      </div>
      </>
    )
  }
}



function App() {
  return (
    <>
      <h1 id="main-title">FUN WITH BOT BOB v5.0!</h1>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={10}>
           <BobLogic />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
