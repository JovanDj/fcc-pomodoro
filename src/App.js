import moment from "moment";
import React, { Component } from "react";
import "./App.css";
import Controls from "./components/Controls";
import Header from "./components/Header";
import SetTimer from "./components/SetTimer";
import Timer from "./components/Timer";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breakValue: 5,
      sessionValue: 25,
      mode: "session",
      time: moment(25 * 60 * 1000).format("mm:ss"),
      active: false
    };
  }

  handleSetTimers = (inc, type) => {
    if (this.state[type] === 60 && inc) {
      return;
    }

    if (this.state[type] === 1 && !inc) {
      return;
    }

    this.setState({ [type]: this.state[type] + (inc ? 1 : -1) });
  };

  render() {
    return (
      <React.StrictMode>
        <div className="container p-5">
          <Header />

          <div className="row">
            <div className="col-md-6">
              <SetTimer
                value={this.state.breakValue}
                type="break"
                setTimers={this.handleSetTimers}
              />
            </div>
            <div className="col-md-6">
              <SetTimer
                setTimers={this.handleSetTimers}
                value={this.state.sessionValue}
                type="session"
              />
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center flex-column d my-5">
            <Timer mode={this.state.mode} time={this.state.sessionValue} />
            <Controls active={this.state.active} />
          </div>
        </div>
      </React.StrictMode>
    );
  }
}

export default App;
