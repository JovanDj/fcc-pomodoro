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
      time: 25 * 60 * 1000,
      active: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.state.time === 0 && this.state.mode === "session") {
      this.setState({ time: this.state.breakValue * 60 * 1000, mode: "break" });
      this.audio.play();
    }

    if (this.state.time === 0 && this.state.mode === "break") {
      this.setState({
        time: this.state.sessionValue * 60 * 1000,
        mode: "session"
      });

      this.audio.play();
    }
  }

  handleReset = () => {
    this.setState({
      breakValue: 5,
      sessionValue: 25,
      time: 25 * 60 * 1000,
      active: false,
      mode: "session",
      touched: false
    });

    this.audio.pause();
    this.audio.currentTime = 0;
    clearInterval(this.pomodoro);
  };

  handlePlayPause = () => {
    if (this.state.active) {
      this.setState({ active: false }, () => clearInterval(this.pomodoro));
    } else {
      if (!this.state.touched) {
        this.setState(
          {
            time: this.state.sessionValue * 60 * 1000,
            active: true,
            touched: true
          },
          () =>
            (this.pomodoro = setInterval(() => {
              this.setState({ time: this.state.time - 1000 });
            })),
          1000
        );
      } else {
        this.setState(
          {
            active: true,
            touched: true
          },
          () => {
            this.pomodoro = setInterval(
              () => this.setState({ time: this.state.time - 1000 }),
              1000
            );
          }
        );
      }
    }
  };

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
                label="Break Length"
                handleClick={this.handleSetTimers}
              />
            </div>
            <div className="col-md-6">
              <SetTimer
                handleClick={this.handleSetTimers}
                value={this.state.sessionValue}
                label="Session Length"
                type="session"
              />
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center flex-column d my-5">
            <Timer
              mode={this.state.mode}
              time={moment(this.state.time).format("mm:ss")}
            />
            <Controls
              active={this.state.active}
              handleReset={this.handleReset}
              handlePlayPause={this.handlePlayPause}
            />
            <audio
              ref={ref => (this.audio = ref)}
              id="beep"
              src="https://s3-us-west-1.amazonaws.com/benjaminadk/Data+synth+beep+high+and+sweet.mp3"
            ></audio>
          </div>
        </div>
      </React.StrictMode>
    );
  }
}

export default App;
